import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background-color: #0f1924;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  color: #fff;
  font-family: "Inter", sans-serif;
`;

const NewsletterBox = styled.div`
  background-color: #111111;
  border-radius: 1rem;
  padding: 2.5rem 3rem;
  width: 550px;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GradientText = styled.p`
  font-weight: 700;
  font-size: 1.125rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, #f72c56, #d14b88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const GradientTitle = styled.h2`
  font-weight: 700;
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, #f72c56, #d14b88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media (max-width: 540px) {
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  flex-grow: 1;
`;

const EmailIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 12px;
  width: 18px;
  height: 18px;
  fill: #999999;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 0.375rem;
  border: none;
  font-size: 1rem;
  color: #333333;
  background-color: #d9d9d9;

  &::placeholder {
    color: #bbbbbb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #f72c56;
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #f72c56, #d14b88);
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(1.1);
  }
`;

const FooterText = styled.p`
  margin-top: 1.5rem;
  font-size: 0.75rem;
  color: #555555;
  text-align: center;
`;

export default function Newsletter() {
  return (
    <Container>
      <NewsletterBox>
        <GradientTitle>
          Quer se manter <br /> atualizado ? <br />
        </GradientTitle>
        <GradientText>
          Se inscreva na <br /> nossa newsletter.
        </GradientText>

        <Form>
          <InputWrapper>
            <EmailIcon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8l7.382 5.253a1 1 0 001.236 0L20 8v10H4z" />
            </EmailIcon>
            <Input type="email" placeholder="Seu email" />
          </InputWrapper>
          <Button type="submit">Inscrever-se</Button>
        </Form>

        <FooterText>Sem spam. Cancele a inscrição quando quiser.</FooterText>
      </NewsletterBox>
    </Container>
  );
}
