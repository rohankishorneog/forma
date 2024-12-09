import ResponseItem from "@/app/components/response/ResponseItem";
import { URLProps } from "@/app/types";
import { getResponsesByFormId } from "@/lib/actions/responses.actions";

const Page = async ({ params }: URLProps) => {
  const responses = await getResponsesByFormId(params.id);
  console.log(responses);

  return (
    <div className="flex flex-col justify-center p-10">
      <div className="flex flex-col gap-3 pl-5">
        <h3 className="font-extrabold md:text-4xl text-lg">All responses </h3>
        <p>Check out the responses to your forms here</p>
      </div>
      <div className="flex flex-col gap-5 p-5">
        <p> Total Responses {responses.length}</p>
        {responses.map((response) => (
          <ResponseItem response={response} key={response._id} />
        ))}
      </div>
    </div>
  );
};

export default Page;
