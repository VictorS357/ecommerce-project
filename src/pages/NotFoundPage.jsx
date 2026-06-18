import { Header } from "../components/Header";
import './NotFoundPage.css';

export function NotFoundPage() {
  return(
    <>
      <Header />

      <h1 className="error-msg">Page Not Found</h1>
    </>
  );
}