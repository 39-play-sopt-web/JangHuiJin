// 게시글 목록 페이지
import styled from "@emotion/styled";
import apiClient from "../apis/apiClient";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
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
        nextCursor: number | null; // 다음 페이지의 시작 위치, 더 없으면 null
        hasNext: boolean; // 이 페이지 뒤에 글이 더 있는지
    }
}

// cursor가 없으면 첫 페이지, 있으면 그 위치 다음 글을 가져온다
const getPosts = async (keyword: string, cursor?: number) => {
    const response = await apiClient.get<PostResponse>(
        "/posts",
        {
            params: {
                size: 10, 
                keyword: keyword === "" ? undefined : keyword,
                cursor, // undefined면 주소에 cursor를 붙이지 않아 첫 페이지가 된다
            },
        },
    );
    // posts만 반환하면 다음 커서와 다음 페이지 여부를 알 수 없다
    return response.data.data;
};


function PostsPage(){
    const [inputValue, setInputValue] = useState("");
    const [keyword, setKeyword] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null); // 목록 맨 아래를 감시할 요소

    const {
        data,
        isPending,
        isError,
        fetchNextPage, // 다음 커서의 페이지를 한 번 더 요청하는 함수
        hasNextPage, // getNextPageParam이 다음 커서를 돌려줬는지
        isFetchingNextPage, // 다음 페이지를 받는 중인지
    } = useInfiniteQuery({
        queryKey: ["posts", keyword], // 검색어마다 페이지를 따로 저장한다
        queryFn: ({ pageParam }) => getPosts(keyword, pageParam), // pageParam이 이번 요청의 cursor
        initialPageParam: undefined as number | undefined, // 첫 요청은 커서 없이 시작
        getNextPageParam: (lastPage) =>
            // 다음 글이 있을 때만 nextCursor를 다음 pageParam으로 넘긴다
            lastPage.hasNext ? lastPage.nextCursor ?? undefined : undefined,
    });

    useEffect(() => {
        const target = bottomRef.current;
        if (!target) return;

        // 감시 대상이 화면에 들어오면 콜백
        const observer = new IntersectionObserver((entries) => {
            // 보이는 중이고, 다음 페이지가 있고, 이미 받는 중이 아닐 때만 요청한다
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        });

        observer.observe(target); // 목록 맨 아래 요소를 감시하기 시작
        return () => observer.disconnect(); // 검색어가 바뀌거나 페이지를 떠나면 감시를 해제
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
                {/* 각 페이지의 posts를 한 목록으로 이어 붙인다. flatMap(): 배열을 평탄화함*/}
                {data?.pages.flatMap((page) => 
                    page.posts.map((post) => (
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
                    )),
                )}
            </List>
            {/* 이 요소가 화면에 보이면 위의 옵저버가 다음 페이지를 불러온다 */}
            <div ref={bottomRef} />
            {/* 이미 그린 카드는 그대로 둠 */}
            {isFetchingNextPage && <Status>게시글을 더 불러오는 중입니다.</Status>}
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
