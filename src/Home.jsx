import { useEffect, useState } from 'react';
import Card from './components/card/Card';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import useApi from './customHooks/useApi';

const Home = () => {
    const { category, data } = useApi();
    const [search, setSearch] = useState('');
    const [searchFilter, setSearchFilter] = useState([]);
    // Update searchFilter initially with all data
    useEffect(() => {
        setSearchFilter(data);
    }, [data]);
    const handleSearchClick = () => {
        console.log(searchFilter);
        const filterData = data.filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchFilter(filterData);  // Log the filtered data immediately
    }

    const handleCatergorySearch = (category) => {
        const filterData = data.filter(item =>
            item.category === category
        );
        setSearchFilter(filterData);
        console.log(filterData);
    }
    const handleByRating = () => {
        const sortedData = [...searchFilter].sort((a, b) => b.rating - a.rating);
        setSearchFilter(sortedData);
        console.log(sortedData)
    }

    const handleSortByPrice = (ascending) => {
        const sortedData = [...searchFilter].sort((a, b) =>
            ascending ? a.price - b.price : b.price - a.price);
        setSearchFilter(sortedData);
        console.log(sortedData)
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = () => {
        setSearchFilter(data);
        console.log(searchFilter);
    }

    return (
        <div>
            <h1>home page</h1>
            <div>
                <input type="text"
                    className='me-2'
                    placeholder='search'
                    onChange={handleChange}
                />
                <Button variant="secondary" className='me-2' onClick={handleSearchClick}>Search</Button>
            </div>
            <div>
                <div className="flex justify-center my-4">
                    {
                        category.map((category, index) => (
                            <span className='me-2' key={index}>
                                <Button variant="secondary" className='me-2'
                                    onClick={() => handleCatergorySearch(category)} >
                                    {category} </Button>
                            </span>
                        ))
                    }
                    <Button variant="secondary" className='me-2' onClick={handleSearch} >All</Button>
                    <Dropdown style={{ display: 'inline-block' }}>
                        <DropdownToggle variant="secondary" id="dropdown-basic">
                            Filter By
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => handleSortByPrice(true)}>Low-to-High</DropdownItem>
                            <DropdownItem onClick={() => handleSortByPrice(false)}>High-to-Low</DropdownItem>
                            <DropdownItem onClick={handleByRating}>By Rating</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <Card data={searchFilter} />
        </div>
    );
};

export default Home;