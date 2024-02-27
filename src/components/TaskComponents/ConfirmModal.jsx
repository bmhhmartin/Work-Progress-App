const ConfirmModal =()=>{
    return (
        <>
            <div className="bg-black opacity-90 fixed top-0 left-0 right-0 bottom-0 w-full h-full z-10"></div>
            <form className="absolute z-[100] top-[50px] left-0 right-0 mx-auto w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:p-11">
                <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
                    Add New Task
                </h2>
                
                <div className="mt-16 flex justify-between lg:mt-20">
                    <button className="rounded bg-red-800 px-4 py-2 text-white transition-all hover:opacity-80">No</button>
                    <button type="submit" className="rounded bg-orange-600 px-4 py-2 text-white transition-all hover:opacity-80">Yes</button>
                </div>
            </form>
        </>
    )
}
export default ConfirmModal;