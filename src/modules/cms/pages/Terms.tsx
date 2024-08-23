import { Loader } from "@/components/common/Loader";
import { useEffect, useState } from "react";
import { useGetTermsAPI } from "../services/cms.service";

export default function Terms() {
  const [termsData, setTermsData] = useState<{ terms: string }>();
  const { getTermsAPI, isLoading } = useGetTermsAPI();
  const getTermsData = async () => {
    const { data, error }= await getTermsAPI();
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
              <div className="MainTitle pt-7 sm:pt-12 md:pt-24 pb-10 md:pb-20 px-8 lg:px-40 text-center">
                {/* Terms of services */}
                <div dangerouslySetInnerHTML={{ __html: termsData.terms }}></div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
