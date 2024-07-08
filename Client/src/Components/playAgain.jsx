import useNavigate from "react";
export const playAgain = () => {
  const navigate = useNavigate();
  navigate("/gameplay");
};
