// ** Packages **
import { useEffect, useState } from "react";

// ** Components **
import { Loader } from "@/components/common/Loader";

// ** Services **
import { useGetTermsAPI } from "../services/cms.service";

export default function Terms() {
  const [termsData, setTermsData] = useState<{ terms: string }>();
  const { getTermsAPI, isLoading } = useGetTermsAPI();
  const getTermsData = async () => {
    const { data, error } = await getTermsAPI();
    if (!error && data) {
      setTermsData(data?.data);
    }
  };
  useEffect(() => {
    getTermsData();
  }, []);
  return (
    <>
      {!isLoading && termsData ? (
        <>
          <section className="bg-CMSPageTop bg-repeat-x">
            <div className="container">
              <div className="MainTitle pt-7 sm:pt-12 md:pt-24 pb-10 md:pb-20 px-8 lg:px-40  ">
                <h1 className=" text-5xl md:text-6xl font-bold text-center pb-6">
                  Terms of services
                </h1>
              </div>
            </div>
            <div
              className="min-h-[50vh] termsContainer"
              dangerouslySetInnerHTML={{ __html: termsData.terms }}
            ></div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
