import React, { useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import AddItemModal from '../components/AddItemModal'
import { useSelector } from 'react-redux'
import ItemCard from '../components/ItemCard'
import ReactPaginate from 'react-paginate'
import { FaPlus, FaSearch } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


function Home() {
  const [filterValue, setFilterValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
  const itemDatas = useSelector(state => state.items)

  const PER_PAGE = 4;
  const offset = currentPage * PER_PAGE;

  const currentPageData = (filteredItems || itemDatas)
    .slice(offset, offset + PER_PAGE)
    .map((item) => <ItemCard key={item.name} item={item} />);

  const pageCount = Math.ceil((filteredItems || itemDatas).length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilteredItems(itemDatas.filter(item => item.name.includes(filterValue)))
    setCurrentPage(0)
  };

  return (

    <div className='w-[85%] lg:max-w-6xl mx-auto flex flex-col gap-3'>
      <div className=' border bg-white text-teal-500 shadow-md text-center font-semibold text-2xl sm:text-3xl md:text-5xl py-6 md:py-10 rounded mt-2'>
        <h1>ITEM LIST</h1>
      </div>
      <div className='flex flex-row-reverse gap-5 justify-between bg-white border rounded p-2 md:p-4'>
        <div className='flex-grow'>
          <form onSubmit={handleSearchSubmit}>
            <div className="flex justify-between w-full text-sm md:text-md">
              <input
                className='border-l border-b border-t rounded-s-md px-4 focus:border-teal-500 focus:outline-none w-full'
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder="Search by item name ..."
              />
              <button
                className="bg-teal-500 hover:bg-teal-600 font-semibold text-white py-2 md:py-3 px-4 rounded-e-md"
                type='submit'
              >
                <FaSearch/>
              </button>
            </div>
          </form>
        </div>
        <div>
          <button
            className='flex gap-2 items-center px-2 md:px-4 h-full md:py-2 text-sm md:text-md bg-teal-500 text-white rounded font-semibold hover:bg-teal-700'
            onClick={onAddOpen}
          >
            <FaPlus/>
            <p className='hidden md:block'>Add Item</p>
          </button>
        </div>
        <div className='hidden'>
          <AddItemModal isOpen={isAddOpen} onClose={onAddClose} />
        </div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-white rounded border p-4'>
        {/* {(filteredItems || itemDatas).map(item => (
          <ItemCard item={item} />
        ))} */}
        {currentPageData.length ? currentPageData : <p>Looks like you have no items. Start by adding one!</p>}
      </div>
      <ReactPaginate
        previousLabel={<IoIosArrowBack />}
        nextLabel={<IoIosArrowForward />}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex justify-center gap-4 items-center text-lg"}
        pageLinkClassName={"px-1"}
        previousLinkClassName={"previous-link"}
        previousClassName="pt-1"
        nextClassName="pt-1"
        nextLinkClassName={"next-link"}
        disabledClassName={"disabled text-neutral-400"}
        activeClassName={`active font-semibold text-teal-500 border-b-2 border-b-teal-500 `}
      />
    </div>
  )
}

export default Home