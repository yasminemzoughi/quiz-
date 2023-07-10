import React from "react";
import { Route, Routes } from "react-router-dom";
import MultiChoice from "./Pages/MultiChoice/MultiChoice";
import ReorderQuiz from "./Pages/ReorderQuiz/Reorder/Reorder";
import TrueFalse from "./Pages/TrueFalse/TrueFalse";
import FillTheblanks from "./Pages/Fill-in-the-blanks/FillTheBlanks";
import NavBar from "./Components/NavBar/NavBar";
import Select from "./Pages/Select/Select";
import Dragdrop from "./Pages/Dragdrop/Dragdrop";
import Arrow from "./Pages/Arrow/Arrow";
import DropDown from "./Pages/DropDown/DropDown";
import FormSteps from "./Components/CreateQuiz/FormComponents/FormSteps";
import Q from "./Components/Fill-in-the-blanks/Q";
import DnD from "./Pages/Dragdrop/DnD";
import Try from "./Pages/Dragdrop/Try";
import DnDTable from "./Pages/Dragdrop/DnDTable";
import DragPic from "./Pages/Dragdrop/DragPic";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
      <Route path="/FormSteps" element={<FormSteps />} />
      <Route path="/fill-in-the-blanks-2" element={<Q />} />
      <Route path="/DnD" element={<DnD />} />
      <Route path="/Try" element={<Try />} />
      <Route path="/DnDTable" element={<DnDTable />} />
      <Route path="/DRagDropPic" element={<DragPic />} />

      

        <Route path="/MultiChoice" element={<MultiChoice />} />
        <Route path="/ReorderQuiz" element={<ReorderQuiz />} />
        <Route path="/TrueFalse" element={<TrueFalse />} />
        <Route path="/FillTheblanks" element={<FillTheblanks />} />
        <Route path="/Select" element={<Select />} />
        <Route path="/DRagDrop" element={<Dragdrop />} />
        <Route path="/Arrow" element={<Arrow />} />
        <Route path="/DropDown" element={<DropDown />} />
      </Routes>
    </div>
  );
};

export default App;
