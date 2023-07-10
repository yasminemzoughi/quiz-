import React from 'react'
import { Link } from 'react-router-dom'
import "./Style.css";
import NewQuizModal from './NewQuizModal';


const TableModal = () => {
  return (
    <div className="home">
            <NewQuizModal>

            <div className="intro-box">
        <div className="intro-texts">
        <p className="intro-description">Choisissez le quiz que vous souhaitez créer</p>
        </div>
        <div className="intro-icon">
          <i className="bi bi-question-circle"></i>
        </div>
      </div>

      <div className="level-boxes">
        <div className="level-box">
          <div className="level-text">
            <h2 className="level-name">Single Choice (prof add quiz)</h2>
            <span>quiz</span>
          </div>
          <Link className="level-link" to="/test/FormSteps">
            <span>Commencer à créer</span> <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        <div className="level-box">
          <div className="level-text">
            <h2 className="level-name">Reorder</h2>
            <span>quiz</span>
          </div>
          <Link className="level-link" to="/ReorderQuiz">
            <span>Commencer à créer</span> <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        <div className="level-box">
          <div className="level-text">
            <h2 className="level-name">True / false</h2>
            <span>quiz</span>
          </div>
          <Link className="level-link" to="/TrueFalse">
            <span>Commencer à créer</span> <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        <div className="level-box">
          <div className="level-text">
            <h2 className="level-name">Fill In The Blanks</h2>
            <span>quiz</span>
          </div>
          <Link className="level-link" to="/FillTheblanks">
            <span>Commencer à créer</span> <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        <div className="level-box">
          <div className="level-text">
            <h2 className="level-name">Multi Choice </h2>
            <span>quiz</span>
          </div>
          <Link className="level-link" to="/Select">
            <span>Commencer à créer</span> <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        <div className="level-box">
          <div className="level-text">
            <h2 className="level-name">Drop Down</h2>
            <span>quiz</span>
          </div>
          <Link className="level-link" to="/AddQuiz">
            <span>Commencer à créer</span> <i className="bi bi-arrow-right"></i>
          </Link>
        </div> 
         <div className="level-box">
          <div className="level-text">
            <h2 className="level-name">Matching</h2>
            <span>quiz</span>
          </div>
          <Link className="level-link" to="/Arrow">
            <span>Commencer à créer</span> <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        <div className="level-box">
          <div className="level-text">
            <h2 className="level-name">Drag And Drop</h2>
            <span>quiz</span>
          </div>
          <Link className="level-link" to="/quiz/DragAndDrop">
            <span>Commencer à créer</span> <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>

      </NewQuizModal>


    </div>
  )
}

export default TableModal
