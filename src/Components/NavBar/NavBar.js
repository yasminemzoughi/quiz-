import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav >
            <Nav.Link href="/MultiChoice">MultiChoice</Nav.Link>
            <Nav.Link href="/ReorderQuiz">ReorderQuiz</Nav.Link>
            <Nav.Link href="/TrueFalse">TrueFalse</Nav.Link>
            <Nav.Link href="/FillTheblanks">FillTheblanks</Nav.Link>
            <Nav.Link href="/Select">select</Nav.Link>
            <Nav.Link href="/DRagDrop">DRagDrop</Nav.Link>
            <Nav.Link href="/Arrow">Arrow</Nav.Link>
            <Nav.Link href="/DropDown">DropDown</Nav.Link>
            <Nav.Link href="/FormSteps">FormSteps</Nav.Link>
            <Nav.Link href="/fill-in-the-blanks-2">fill-in-2</Nav.Link>
            <Nav.Link href="/DnD">DnD</Nav.Link>
            <Nav.Link href="/DnDTable">DnDTable</Nav.Link>
            <Nav.Link href="/DRagDropPic">DRagDropPic</Nav.Link>


 
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
