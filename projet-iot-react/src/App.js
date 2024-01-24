import {Heading} from "@chakra-ui/react"
import './App.css';
import ActionSection from "./feature/ActionBarSection.tsx";

function App() {
  return (
  <>
      <Heading width="100%" bg="teal.400" py={4} display="flex" justifyContent="center">Station météo</Heading>
      <ActionSection />

  </>

  );
}

export default App;
