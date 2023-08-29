import React, { useState } from "react";
import "./styles/App.css"; // Import the main stylesheet for your entire application

// Import your components for each "page"
import Main from "./components/Main";
import Accounts from "./components/Accounts";
import Sources from "./components/Sources";
import Jobs from "./components/Jobs";
import Navbar from "./components/Navbar"; // Import the Navbar component
import Footer from "./components/Footer"; // Import the Footer component

function App() {
  // State to manage the current active page
  const [currentPage, setCurrentPage] = useState<string>("main");

  // Function to change the current page
  const changePage = (page: string) => {
    setCurrentPage(page);
  };

  // Render the appropriate component based on the current page
  const renderPage = () => {
    switch (currentPage) {
      case "main":
        return <Main />;
      case "accounts":
        return <Accounts />;
      case "sources":
        return <Sources />;
      case "jobs":
        return <Jobs />;
      default:
        return <Main />; // Default to the main page
    }
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <Navbar changePage={changePage} />

      {/* Main Content Area */}
      <div className="main-content">{renderPage()}</div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
