import { InfoFields } from "components/generic/ui/fields/info.component";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { Button, Dialog } from '@headlessui/react'

type Offer = {
  id: number;
  name: string;
  description: string;
  status: string;
  industry: string;
  quantity: string;
  images: string[];
  offerResponse: {
    price: string;
    vat: string;
    totalPrice: string;
    comment: string;
    startDate: string;
    createdAt: string;
  }
  client: Client;
  supplier: Supplier;
}

type Client = {
  companyName: string;
  email: string;
  phone: string;
  company: {
    size: string;
    address: string;
  }
}

type Supplier = {
  companyName: string;
  email: string;
  phone: string;
  industry: string;
  company: {
    size: string;
    address: string;
  }
}

const OfferModal = ({ offer, buttonStyle }: { offer: Offer, buttonStyle?: string }) => {
  let [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <>
      <Button
        onClick={open}
        className={buttonStyle || "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}
      >
        عرض التفاصيل
      </Button>

      <Dialog open={isOpen} as="div"
        className="focus:outline-none overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full center"
        onClose={close}
      >
        <div onClick={close} className="fixed h-[100%] w-full z-[100] bg-black opacity-50" />
        {
          !offer ?
            <NotFoundModal close={close} />
            :
            <OfferContent offer={offer} close={close} />
        }
      </Dialog>
    </>
  )
}

const NotFoundModal = ({ close }) => {
  return (
    <div
      id="offer-modal"
      tabIndex={-1}
      aria-hidden="false"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-[101] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 max-h-full flex">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 flex-1">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
            <button onClick={close} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="offer-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">أغلق القائمة</span>
            </button>
            <h3 className="text-xl font-semibold px-10 text-gray-900 dark:text-white">
              هذه البيانات غير متوفرة حاليا لهذا العرض
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

const OfferContent = ({ offer, close }) => {
  return (
    <>
      {/* <!-- Modal content --> */}
      <div className="relative rounded-lg shadow dark:bg-gray-700 flex-1 p-4 min-w-[50%] z-[101] max-w-[80%] min-h-[50%] max-h-full bg-white">
        {/* <!-- Modal header --> */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            كود العرض #{offer?.id}
          </h3>
          <button onClick={close} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="offer-modal">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">أغلق القائمة</span>
          </button>
        </div>
        {/* <!-- Modal body --> */}
        <div className="p-4 md:p-5 space-y-4">
          <OfferData offer={offer} />
          <OfferClientData client={offer?.client} />
          <OfferSupplierData supplier={offer?.supplier} />
        </div>
      </div>
    </>
  )
}


const OfferData = ({ offer }: { offer: Offer }) => {
  if (!offer) return null;
  const response = offer.offerResponse as Offer['offerResponse'];
  return (
    <div className="block w-full p-6 mb-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">بيانات الطلب</h5>
      <InfoFields
        center={false}
        fields={
          [
            {
              title: "الإسم",
              value: offer.name
            },
            {
              title: "الوصف",
              value: offer.description
            },
            {
              title: "القسم",
              value: offer.industry
            },
            {
              title: "الكمية",
              value: offer.quantity
            },
            {
              title: "الحالة",
              value: offer.status
            },
            {
              title: "الصور",
              value: offer.images.length + ""
            },
            ...[
              ...(offer.offerResponse ? [
                {
                  title: "السعر",
                  value: response.price
                },
                {
                  title: "سعر ض.ق.م",
                  value: response.vat
                },
                {
                  title: "السعر الكلي",
                  value: response.totalPrice
                },
                {
                  title: "تعليق",
                  value: response.comment
                },
                {
                  title: "تاريخ التوصيل",
                  value: toDate(response.startDate)
                },
                {
                  title: "تاريخ الرد",
                  value: toDate(response.createdAt)
                },
              ] : [])
            ]
          ]
        } />
    </div>
  );
}
const OfferClientData = ({ client }: { client: Client }) => {
  console.log(client)
  if (!client) return null;
  return (
    <div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">بيانات العميل</h5>
      <InfoFields
        center={false}
        fields={
          [
            {
              title: "إسم العميل",
              value: client.companyName
            },
            {
              title: "البريد الإلكتروني",
              value: client.email
            },
            {
              title: "الهاتف",
              value: client.phone
            },
            {
              title: "حجم الشركة",
              value: client.company.size
            },
            {
              title: "عنوان الشركة",
              value: client.company.address
            },
          ]
        } />
    </div>
  );
}
const OfferSupplierData = ({ supplier }: { supplier: Supplier }) => {
  if (!supplier) return null;
  return (
    <div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">بيانات المورد</h5>
      <InfoFields
        center={false}
        fields={
          [
            {
              title: "إسم المورد",
              value: supplier.companyName
            },
            {
              title: "البريد الإلكتروني",
              value: supplier.email
            },
            {
              title: "القسم",
              value: supplier.industry
            },
            {
              title: "الهاتف",
              value: supplier.phone
            },
            {
              title: "حجم الشركة",
              value: supplier.company.size
            },
            {
              title: "عنوان الشركة",
              value: supplier.company.address
            },
          ]
        } />
    </div>
  );
}

export default OfferModal;

const toDate = (date) => new Date(date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {}
  };
}