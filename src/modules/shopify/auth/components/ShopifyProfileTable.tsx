// import { SearchIcon } from '@/assets/Svg'
import React from 'react'
import useShopifyProfileHeaders from '../hooks/useShopifyProfileHeaders'
import DataTable from 'react-data-table-component'
import { ShopifyProfileAttributeType } from '../types'
import { Loader } from '@/components/common/Loader'
import { DataNotFound } from '@/components/svgIcons'
import useTable from '@/hooks/useTable'
interface ShopifyProfileTableProps {
    isLoading: boolean;
    data: ShopifyProfileAttributeType[];
    onSelect: (data: ShopifyProfileAttributeType) => void;
}
const ShopifyProfileTable: React.FC<ShopifyProfileTableProps> = ({
    data,
    isLoading,
    onSelect
}) => {
    const getData = async () => {
        return {
            data: data,
            totalRecord: data.length
        }
    }
    const { ...TableProps } = useTable<ShopifyProfileAttributeType>({
        getData,
      });
    const { shopifyProfileheaders } = useShopifyProfileHeaders({
        onSelect
    });

    return (
        <section className=" p-2 mb-5 h-[calc(100%_-_40px)]  overflow-y-auto scroll-design  ">
            {/* <div className="mb-4 flex gap-4 justify-end">
                <div className="relative">
                    <input
                        className="bg-grayLightBody/10 py-3 px-9 outline-none focus:outline-none border rounded-md"
                        type="text"
                        // onChange={onSearch}
                        placeholder="Search by name, email..."
                    />
                    <span className="inline-block absolute left-3 top-4">
                        <SearchIcon />
                    </span>
                </div>
            </div> */}
            <div className="bg-grayLightBody/10 p-5 ">
                <h3 className="font-medium text-2xl mb-6">Stores / Shops</h3>
                <div className="">
                    <DataTable<ShopifyProfileAttributeType>
                        className="dataTable"
                        columns={shopifyProfileheaders}
                        progressPending={isLoading}
                        progressComponent={
                            <div>
                                <Loader />
                            </div>
                        }
                        noDataComponent={
                            <>
                                <DataNotFound />
                            </>
                        }
                        {...TableProps}
                    />
                </div>
            </div>
        </section>
    )
}

export default ShopifyProfileTable