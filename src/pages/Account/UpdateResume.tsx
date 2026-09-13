import { UploadOutlined } from "@ant-design/icons";
import {
    Button,
    message,
    notification,
    Upload,
    type UploadFile,
    type UploadProps,
} from "antd";
import React, { useEffect, useState } from "react";
import type { User } from "../../components/types";
import axios from "axios";
import { useAppData } from "../../context/AppContext";

const auth_service = import.meta.env.VITE_AUTH_SERVICE;
interface UpdateResumeProps {
    user: User;
}

const UpdateResume: React.FC<UpdateResumeProps> = ({
    user,
}) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [loading, setLoading] = useState(false);
    const { resumeUpdate,resumeDelete } = useAppData()

    useEffect(() => {
        if (user.resume) {
            setFileList([
                {
                    uid: "-1",
                    name: "Current Resume.pdf",
                    status: "done",
                    url: user.resume,
                },
            ]);
        }
    }, [user]);

    const onResumeChange = async (file: File) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', file)
            //const { data } = await axios.post(`${auth_service}/api/user/update/resume`, formData);
            resumeUpdate(formData)

        } catch (error: any) {
            //  notification.error({ message: error?.response?.data?.message || "Failed to upload resume", placement: "top" })
        } finally {
            setLoading(false)
        }
    }

    const uploadProps: UploadProps = {
        accept: ".pdf,application/pdf",
        maxCount: 1,
        fileList,

        beforeUpload: (file) => {
            const isPdf = file.type === "application/pdf";

            if (!isPdf) {
                message.error("You can only upload PDF files!");
                return Upload.LIST_IGNORE;
            }

            const isLt5MB = file.size / 1024 / 1024 < 5;

            if (!isLt5MB) {
                message.error("PDF must be smaller than 5MB!");
                return Upload.LIST_IGNORE;
            }

            return false;
        },

        onChange: ({ fileList: newFileList }) => {
            const latestFileList = newFileList.slice(-1);
            setFileList(latestFileList);
            const file = latestFileList[0]?.originFileObj;
            if (file) {
                onResumeChange?.(file);
            }
        },

        onRemove: () => {
            if(user.resume && user.resume_public_id)
            resumeDelete(user.resume,user.resume_public_id)
            setFileList([]);
            // onResumeChange?.(null);
        },
    };

    return (
        <Upload
            {...uploadProps}
            listType="picture"
            style={{ backgroundColor: "white" }}
        >
            <Button
                icon={<UploadOutlined />}
                style={{ margin: 4 }}
            >
                Replace Resume
            </Button>
        </Upload>
    );
};

export default UpdateResume;
