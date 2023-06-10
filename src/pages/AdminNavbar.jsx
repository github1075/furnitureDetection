import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function AdminNavbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <p style={{color:'white', fontSize:'20px'}}>Admin Panel</p>
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/adminHome">Home</Nav.Link>
            <Nav.Link as={Link} to="/addproduct">Add Product</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;