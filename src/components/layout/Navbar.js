import React from 'react';
class Navbar extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar fixed-top" style={{ backgroundColor: '#eeeeee' }} data-bs-theme="light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img
                src="/cook-book.png"
                alt="Logo"
                width={40}
                height={34}
                className="d-inline-block align-text-top"
              />
              CookBook
            </a>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
