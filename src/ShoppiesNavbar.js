import { Navbar, Form, Nav, FormControl, Button, NavItem} from 'react-bootstrap';
import React, { useRef } from 'react';

function ShoppiesNavbar({searchOMDV, nominationsCompleted}) {

  const searchBoxRef = useRef(null);

  return (
    <Navbar sticky='top' bg="light" expand="lg">
      <Navbar.Brand href="#home">The Shoppies Nomination Tool</Navbar.Brand>
      {nominationsCompleted && 
        <Nav>
          <NavItem>Nominations complete!</NavItem>
        </Nav>
      }
      <Form inline className="ml-auto">
      <FormControl type="text" placeholder="Search for a movie..." className="mr-sm-2" ref={searchBoxRef} onKeyPress={e => {
        if (e.key === "Enter") {
          e.preventDefault();
            searchOMDV(searchBoxRef.current.value.trim());
        }
        }}/>
      <Button variant="outline-success" onClick={() => searchOMDV(searchBoxRef.current.value.trim())}>Search</Button>
      </Form>
    </Navbar>
  );
}

export default ShoppiesNavbar;
