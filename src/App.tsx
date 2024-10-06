import styled from "styled-components";
import { NestedList } from "./components/NestedList";

function App() {
  return (
    <AppContainer>
      <h1>Nested List</h1>
      <NestedList />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
`;
