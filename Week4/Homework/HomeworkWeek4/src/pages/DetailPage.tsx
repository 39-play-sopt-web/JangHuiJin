import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


type PostResponse = {
    data: {
        title: string;
        content: string;
        author: string;
        createdAt: string;
        updatedAt: string;
    }
}
const GetPostsDetail = async (id: number) => {
    const response = await axios.get<PostResponse>(
        `${import.meta.env.VITE_API_URL}/posts/${id}`, {
    }
    )
    
    return response.data.data;
}

const UpdatePost = async (id: number, payload: { title: string, content: string }) => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/posts/${id}`, payload, {
        headers: { Authorization: localStorage.getItem("authorizationCode"), }
    });
    return response.data.data;
}

const DeletePost = async (id: number) => {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
            headers: { Authorization: localStorage.getItem("authorizationCode"), }
        });
        return response.data.data;
}


function DetailPage() {

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const { postId } = useParams();
    const id = Number(postId);

    const { data, isPending, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: () => GetPostsDetail(id),
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: () => UpdatePost(id, { title, content }),
        onSuccess: () => {
            alert("게시글이 수정되었어요.");
            //invalidateQueries 옵션을 사용해 'posts' 키를 가진 쿼리를 무효화해서 목록을 새로고침함
            queryClient.invalidateQueries({ queryKey: ["post", id] }); //게시글 상세 
            queryClient.invalidateQueries({ queryKey: ["posts"] }); //목록 
            setIsEditing(false);
        },
        onError: () => {
            alert("게시글 수정에 실패했어요.");
        },
    });

    const {mutate: deletePost} = useMutation({
        mutationFn: () => DeletePost(id),
        onSuccess: () => {
            navigate("/posts");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: () => {
            alert("게시글 삭제에 실패했어요.");
        },
    })

    
    if (isPending) return <Page>게시글을 불러오는 중입니다.</Page>;
    if (isError || !data) return <Page>게시글을 불러오지 못했습니다.</Page>;

    if (isEditing) {
        return (
            <Page>
                <Heading>게시글 수정</Heading>
                <FieldLabel>제목</FieldLabel>
                <TextInput
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <LetterCount>{title.length} / 50</LetterCount>
                <FieldLabel>본문</FieldLabel>
                <TextArea
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                />
                <LetterCount>{content.length} / 1000</LetterCount>
                <ButtonRow>
                    <OutlineButton type="button" onClick={() => setIsEditing(false)}>
                        취소
                    </OutlineButton>
                    <PrimaryButton type="button" onClick={() => mutate()}>
                        수정 완료
                    </PrimaryButton>
                </ButtonRow>
            </Page>
        );
    }

    return (
        <Page>
            <BackButton type="button" onClick={() => navigate("/posts")}>
                ← 목록으로
            </BackButton>
            <Card>
                <Title>{data.title}</Title>
                <Meta>
                    <Author>{data.author}</Author>
                    <CreatedAt>{(new Date(data.createdAt)).toLocaleString()}</CreatedAt>
                </Meta>
                <Body>{data.content}</Body>
                <Divider />
                <ButtonRow>
                    <OutlineButton type="button" onClick={() => 
                        {setIsEditing(true);
                        setTitle(data.title);
                        setContent(data.content);
                        }}>
                        수정
                    </OutlineButton>
                    <PrimaryButton type="button" onClick={()=> {
                        if (window.confirm("정말 게시글을 삭제할까요?")) {
                            deletePost();
                        }
                    }}>삭제</PrimaryButton>
                </ButtonRow>
            </Card>
        </Page>
    );
}

export default DetailPage;

const Page = styled.main`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 640px;
    margin: 32px auto 0;
`;

const BackButton = styled.button`
    height: 44px;
    margin-bottom: 16px;
    padding: 0 16px;
    border: 1px solid ${({ theme }) => theme.colors.line};
    border-radius: 8px;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    transition: border-color 0.2s ease;

    &:hover:not(:disabled) {
        border-color: ${({ theme }) => theme.colors.lineDark};
    }
`;

const Card = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 22px 22px 16px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.h2`
    margin: 0;
    font-size: 18px;
    font-weight: 700;
`;

const Meta = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    font-size: 13px;
`;

const Author = styled.span`
    color: ${({ theme }) => theme.colors.primary};
`;

const CreatedAt = styled.span`
    color: ${({ theme }) => theme.colors.muted};
`;

const Body = styled.p`
    margin: 16px 0 0;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 14px;
`;

const Divider = styled.hr`
    width: 100%;
    height: 0;
    margin: 20px 0 16px;
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.lineDark};
`;

const Heading = styled.h1`
    margin: 0 0 28px;
    font-size: 24px;
    font-weight: 700;
`;

const FieldLabel = styled.label`
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 14px;

    &:not(:first-of-type) {
        margin-top: 16px;
    }
`;

const TextInput = styled.input`
    width: 100%;
    height: 44px;
    padding: 0 16px;
    border: 1px solid transparent;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
        color: ${({ theme }) => theme.colors.muted};
    }

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary};
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 160px;
    padding: 12px 16px;
    border: 1px solid transparent;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    resize: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
        color: ${({ theme }) => theme.colors.muted};
    }

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary};
    }
`;

const LetterCount = styled.p`
    width: 100%;
    margin: 8px 0 0;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 12px;
    text-align: right;
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: 8px;
    margin-top: 12px;
`;

const OutlineButton = styled.button`
    height: 44px;
    padding: 0 16px;
    border: 1px solid ${({ theme }) => theme.colors.line};
    border-radius: 8px;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    transition: border-color 0.2s ease;

    &:hover:not(:disabled) {
        border-color: ${({ theme }) => theme.colors.lineDark};
    }
`;

const PrimaryButton = styled.button`
    height: 44px;
    padding: 0 16px;
    border: none;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    font-weight: 800;
    transition: background-color 0.2s ease;

    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.colors.primaryHover};
    }

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
`;
