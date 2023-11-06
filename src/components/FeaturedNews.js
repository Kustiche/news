import Blocks from "./Blocks";

export default function FeaturedNews({ news, onClick }) {
  return (
    <>
      <Blocks news={news} onClick={onClick} />
    </>
  );
}
