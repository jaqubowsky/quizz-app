import { Oval } from "react-loader-spinner";
import styled from "styled-components";

const StyledLoader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Load = () => {
  return (
    <StyledLoader>
      <Oval
        height={80}
        width={80}
        color="blue"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="white"
        strokeWidth={5}
        strokeWidthSecondary={1}
      />
    </StyledLoader>
  );
};
