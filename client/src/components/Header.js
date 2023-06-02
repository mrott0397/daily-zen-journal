import AppNavbar from "./Nav";

function Header (props) {
    const { currentPage, handlePageChange } = props;
    return (
 <header>
<AppNavbar 
currentPage={currentPage}
handlePageChange={handlePageChange}/>
 <h1>Daily Zen Journal </h1>
{/* <AppNavbar /> */}
</header> 
    );
    }

export default Header;