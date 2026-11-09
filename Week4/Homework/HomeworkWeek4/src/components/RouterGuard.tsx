// 라우터 가드
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

function RouterGuard() {
    const navigate = useNavigate();
    const authorizationCode = localStorage.getItem("authorizationCode");

    useEffect(() => {
        if (!authorizationCode) {
            alert("먼저 파트를 선택하고 코드를 발급받아 주세요.");
            navigate("/", { replace: true });
        }
    }, [authorizationCode, navigate]);

    if (!authorizationCode) {
        return null;
    }

    return <Outlet />;
}

export default RouterGuard;
