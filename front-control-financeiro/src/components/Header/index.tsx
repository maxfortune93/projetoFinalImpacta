import logo from "../../assets/logo.svg";
import { AvatarMenu } from "../AvatarMenu";
import { Container, Content, TitleHeader, TitleHeaderWithLogo } from "./styles";

// interface HeaderProps {
//     onOpenNewTransactionModal: () => void;
// }
export function Header() {
  return (
    <Container>
      <Content>
        <TitleHeaderWithLogo >
           <img src={logo} alt="controle financeiro" />
           <TitleHeader>Controle de Finance</TitleHeader>
        </TitleHeaderWithLogo>
        
        {/* <Button  onClick={onOpenNewTransactionModal}>
            Nova Transferencia
        </Button>
         */}
        <AvatarMenu />
      </Content>
    </Container>
  );
}
