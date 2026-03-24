import { useState } from "react";
import AIPredictionModal from "../../components/AIPredictionModal";


const HomeAIButton = () => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg"
      >
        🤖 AI
      </button>

      {open && <AIPredictionModal close={() => setOpen(false)} />}
    </>
  );
};

export default HomeAIButton;