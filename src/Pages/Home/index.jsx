import Container from "../../Components/Container";
import Button from "../../Components/Button";
import styled from "styled-components";

const StyledTitle = styled.div`
  text-align: center;
`;

const Title = () => {
  return (
    <StyledTitle>
      <h1>Quizzical</h1>
      <p>Simple quizz game</p>
    </StyledTitle>
  );
};

const Home = () => {
  return (
    <Container>
      <Title />
      <Button name="Start quiz" />
    </Container>
  );
};

export default Home;
