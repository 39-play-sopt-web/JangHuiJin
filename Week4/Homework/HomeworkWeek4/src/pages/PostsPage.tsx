// 게시글 목록 페이지
import styled from "@emotion/styled";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

type PostResponse = {
    data: {
        posts: Post[];
    }
}

const getPosts = async (keyword: string) => {
    const response = await axios.get<PostResponse>(
        `${import.meta.env.VITE_API_URL}/posts`,
        {
            params: {
                size: 10,
                keyword: keyword === "" ? undefined : keyword,
            },
        },
    );
    return response.data.data.posts;
};


function PostsPage(){
    const [inputValue, setInputValue] = useState("");
    const [keyword, setKeyword] = useState("");

    const { data, isPending, isError } = useQuery({
        queryKey: ["posts", keyword],
        queryFn: () => getPosts(keyword),
    });

    const handleSearch = () => {
        setKeyword(inputValue);
    };

    return (
        <Page>
            <SearchRow>
                <SearchInput
                    value={inputValue}
                    placeholder="제목으로 검색"
                    onChange={(event) => {
                        setInputValue(event.target.value);
                        if (event.target.value === "") {
                            setKeyword("");
                        }
                    }}
                />
                <SearchButton
                    type="button"
                    disabled={inputValue === ""}
                    onClick={handleSearch}
                >
                    검색
                </SearchButton>
            </SearchRow>
            {isPending && <Status>게시글을 불러오는 중입니다.</Status>}
            {isError && <Status>게시글을 불러오지 못했습니다.</Status>}
            <List>
                {Array.isArray(data) && data.map((post) => (
                    <PostCard key={post.id} to={`/posts/${post.id}`}>
                        <PostTitle>{post.title}</PostTitle>
                        <PostContent>{post.content}</PostContent>
                        <PostMeta>
                            <Author>{post.author}</Author>
                            <time>
                                {new Date(post.createdAt).toLocaleString("ko-KR", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </time>
                        </PostMeta>
                    </PostCard>
                ))}
            </List>
        </Page>
    );
}

export default PostsPage;

const Page = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 32px 24px;
`;

const SearchRow = styled.div`
    display: flex;
    width: 720px;
    gap: 12px;
`;

const SearchInput = styled.input`
    flex: 1;
    height: 44px;
    padding: 0 16px;
    border: 1px solid transparent;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    transition: border-color 0.2s ease;

    &::placeholder {
        color: ${({ theme }) => theme.colors.muted};
    }

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const SearchButton = styled.button`
    height: 44px;
    padding: 0 20px;
    border: none;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    font-weight: 700;
    cursor: pointer;

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
`;

const Status = styled.p`
    width: 720px;
    margin: 0;
    color: ${({ theme }) => theme.colors.muted};
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 720px;
    gap: 12px;
`;

const PostCard = styled(Link)`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 18px 20px;
    border: 1px solid transparent;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.surface};
    color: inherit;
    text-decoration: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary};
    }
`;

const PostTitle = styled.h2`
    margin: 0;
    font-size: 18px;
    font-weight: 700;
`;

const PostContent = styled.p`
    margin: 0;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const PostMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 12px;
`;

const Author = styled.span`
    color: ${({ theme }) => theme.colors.primary};
`;