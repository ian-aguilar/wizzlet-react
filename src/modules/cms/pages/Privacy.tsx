// ** Packages **
import { useEffect, useState } from "react";

// ** Components **
import { Loader } from "@/components/common/Loader";

// ** Services **
import { useGetPrivacyAPI } from "../services/cms.service";

export default function Privacy() {
  const [privacyData, setPrivacyData] = useState<{ privacy: string }>();
  const { getPrivacyAPI, isLoading } = useGetPrivacyAPI();
  const getPrivacyData = async () => {
    const { data, error } = await getPrivacyAPI();
    if (!error && data) {
      setPrivacyData({ privacy: data.data.policy });
    }
  };
  useEffect(() => {
    getPrivacyData();
  }, []);
  return (
    <>
      {!isLoading && privacyData ? (
        <>
          <section className="bg-CMSPageTop bg-repeat-x">
            <div className="container">
              <div className="MainTitle pt-7 sm:pt-12 md:pt-24 pb-10 md:pb-20 px-8 lg:px-40  ">
                <h1 className=" text-5xl md:text-6xl font-bold text-center pb-6">
                  Privacy Policy
                </h1>{" "}
              </div>
            </div>

            <div
              className="min-h-[50vh] termsContainer"
              dangerouslySetInnerHTML={{ __html: privacyData.privacy }}
            ></div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
