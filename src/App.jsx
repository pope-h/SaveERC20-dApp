import { Container } from "@radix-ui/themes";
import Header from "./component/Header";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import CustomerCard from "./component/CustomerCard";
import AdminCard from "./component/AdminCard";
import useIsOwner from "./hooks/useIsOwner";

configureWeb3Modal();

function App() {
  const isOwner = useIsOwner();

  return (
    <Container>
      <Header />
      <main className="mt-12 flex flex-col gap-8">
        { isOwner && <AdminCard /> }
        <CustomerCard />
      </main>
    </Container>
  );
}

export default App
