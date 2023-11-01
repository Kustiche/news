import { useLocation } from "react-router-dom";
import Blocks from "./Blocks";

export default function SeparateNews({ news }) {
  const link = useLocation();
  const separateNews = news.find((item) => item.url === link.state);
  return <Blocks news={[separateNews]} />;
}
