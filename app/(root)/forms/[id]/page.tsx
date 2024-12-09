import { getFormById } from "@/lib/actions/forms.actions";
import { URLProps } from "@/app/types";
import FormSubmission from "@/app/components/FormSubmission/FormSubmission";

const FormDetailPage = async ({ params }: URLProps) => {
  const form = await getFormById(params.id);

  return (
    <div className="container mx-auto px-4">
      <FormSubmission
        formId={form._id.toString()}
        fields={form.fields}
        formTitle={form.title}
      />
    </div>
  );
};

export default FormDetailPage;
