import { LeftArrowIcon } from "@/assets/Svg";
import { PrivateRoutesPath } from "@/modules/Auth/types";
import { useNavigate, useParams } from "react-router-dom";

const ViewUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div className="border-b border-greyBorder pb-2 mb-4 flex justify-between">
          <div className="flex gap-5">
            <div
              className="border p-2 rounded-full bg-white cursor-pointer"
              onClick={() => {
                navigate(PrivateRoutesPath.userManagement.view);
              }}
            >
              <LeftArrowIcon />
            </div>
            <h3 className="text-2xl  text-blackPrimary  font-medium">
              User Details
            </h3>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ViewUser;
