// 게시글 작성 페이지
import styled from "@emotion/styled";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
    
function WritePage() {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");


    const handleNext = () => {
        setPage(page + 1);
    };
    const handleGoToList = () => {
        navigate("/posts");
    };

    const {mutate, isPending, isError} = useMutation({
        mutationFn: () => { return axios.post(`${import.meta.env.VITE_API_URL}/posts`, {
            title,
            content,
            author,
        },
            { headers: { Authorization: localStorage.getItem("authorizationCode"), }});},
        onSuccess: () => {
            alert(`${author}님, 게시글이 작성되었어요!`);
            navigate("/posts");
        },
        onError: () => {
            alert("게시글 작성에 실패했어요.");
        },
    });


    return (
        <Page>
            <Heading>글쓰기</Heading>
            {page === 1 && (
                <>
                    <FieldLabel>제목</FieldLabel>
                    <TextInput
                        type="text"
                        placeholder="제목을 입력하세요."
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <LetterCount>{title.length} / 50</LetterCount>
                    {title.length > 50 && <FieldError>제목은 50자 이하로 입력해주세요.</FieldError>}
                    <ButtonRow>
                        <ListButton type="button" onClick={handleGoToList}>
                            목록으로
                        </ListButton>
                        <PrimaryButton type="button" disabled={title.length > 50 || title.length < 1} onClick={handleNext}>
                            다음
                        </PrimaryButton>
                    </ButtonRow>
                </>
            )}
            {page === 2 && (
                <>
                    <FieldLabel>본문</FieldLabel>
                    <TextArea
                        placeholder="본문을 입력하세요."
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />
                    <LetterCount>{content.length} / 1000</LetterCount>
                    {content.length > 1000 && <FieldError>본문은 1000자 이하로 입력해주세요.</FieldError>}
                    <ButtonRow>
                        <ListButton type="button" onClick={handleGoToList}>
                            목록으로
                        </ListButton>
                        <PrimaryButton type="button" disabled={content.length > 1000 || content.length < 1} onClick={handleNext}>
                            다음
                        </PrimaryButton>
                    </ButtonRow>
                </>
            )}
            {page === 3 && (
                <>
                    <FieldLabel>작성자</FieldLabel>
                    <TextInput
                        type="text"
                        placeholder="작성자를 입력하세요."
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                    />
                    <LetterCount>{author.length} / 20</LetterCount>
                    {author.length > 20 && <FieldError>작성자는 20자 이하로 입력해주세요.</FieldError>}
                    <ButtonRow>
                        <ListButton type="button" onClick={handleGoToList}>
                            목록으로
                        </ListButton>
                        <PrimaryButton type="button" disabled={author.length > 20 || author.length < 1} onClick={() => mutate()}>
                            작성
                        </PrimaryButton>
                    </ButtonRow>
                </>
            )}
        </Page>
    );
}

export default WritePage;

const Page = styled.main`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 640px;
    margin: 48px auto 0;
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

const FieldError = styled.p`
    margin: 0;
    color: ${({ theme }) => theme.colors.error};
    font-size: 10px;
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: 8px;
    margin-top: 12px;
`;

const ListButton = styled.button`
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
