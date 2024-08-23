import { Loader } from "@/components/common/Loader";
import { useEffect, useState } from "react";
import { useGetPrivacyAPI } from "../services/cms.service";

export default function Privacy() {
  const [privacyData, setPrivacyData] = useState<{ privacy: string }>();
  const { getPrivacyAPI, isLoading } = useGetPrivacyAPI();
  const getFaqData = async () => {
    const { data, error } = await getPrivacyAPI();
    if (!error && data) {
    setPrivacyData({ privacy: data.data.policy });
    }
  };
  useEffect(() => {
    getFaqData();
  }, []);
  return (
    <>
      {!isLoading && privacyData ? (
        <>
          <section className="bg-CMSPageTop bg-repeat-x">
            <div className="container">
              <div className="MainTitle pt-7 sm:pt-12 md:pt-24 pb-10 md:pb-20 px-8 lg:px-40 text-center">
                {/* Frequently asked questions */}
                <div dangerouslySetInnerHTML={{ __html: privacyData.privacy }}></div>
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
