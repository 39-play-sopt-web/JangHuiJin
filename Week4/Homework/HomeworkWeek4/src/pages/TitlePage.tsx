// 코드 발급 타이틀 페이지
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";

type Part = "WEB" | "ANDROID" | "iOS";

type CodeResponse = {
  data: {
    authorizationCode: string;
  };
};

const postAuthorizationCode = async (part: Part) => {
  const response = await axios.post<CodeResponse>(
    `${import.meta.env.VITE_API_URL}/members/authorization-code`, {part},
  );
  return response.data.data.authorizationCode;
};

function TitlePage() {
  const [part, setPart] = useState<Part | "">("");
  const navigate = useNavigate();

  // 코드 발급 요청
  const { mutate, isPending, isError } = useMutation({
    mutationFn: postAuthorizationCode,
    onSuccess: (authorizationCode) => {
      localStorage.setItem("authorizationCode", authorizationCode);
      localStorage.setItem("part", part);
      alert("회원코드가 발급되었습니다.");
      navigate("/posts");
    },
    onError: () => {
      alert("회원코드 발급에 실패했습니다.");
    },
  });

  return (
    <Page>
      <Content>
      <Title>PLAY SOPT 게시판</Title>
      <Description>파트를 선택하면 코드가 발급됩니다.</Description>
      <Form>
        <Label htmlFor="part">파트</Label>
        <Row>
          <Select
            id="part"
            value={part}
            disabled={isPending}
            onChange={(event) => {
              const value = event.target.value;

              if (value === "WEB" || value === "ANDROID" || value === "iOS") {
                setPart(value);
              }
            }}
          >
            <option value="">파트를 선택하세요</option>
            <option value="WEB">WEB</option>
            <option value="ANDROID">ANDROID</option>
            <option value="iOS">iOS</option>
          </Select>
          <IssueButton
            type="button"
            disabled={isPending || part === ""}
            onClick={() => {
              if (part !== "") {
                mutate(part);
              }
            }}
          >
            {isPending ? "발급중..." : "코드 발급받기"}
          </IssueButton>
        </Row>
        <ListButton
          type="button"
          onClick={() => {
            if (part !== "") {
              navigate("/posts");
            } else {
              alert("먼저 파트를 선택하고 코드를 발급받아 주세요.");
            }
          }}
        >
          게시판 목록 보기
        </ListButton>
        {isError && <Error>회원코드 발급에 실패했습니다. 다시 시도해주세요.</Error>}
      </Form>
      </Content>
    </Page>
  );
}

export default TitlePage;

const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 400px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const Description = styled.p`
  margin: 8px 0 28px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
`;

const Label = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const Select = styled.select`
  flex: 1;
  height: 44px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const IssueButton = styled.button`
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
`;

const ListButton = styled.button`
  height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.lineDark};
  }
`;

const Error = styled.p`
  margin: 0;
`;