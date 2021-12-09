import { useParams } from 'react-router';
import CreateCarForm from '../Organism/CreateCarForm';
import PageTemplate from '../Templates/Page';

const EditPage = () => {
  const params = useParams();

  return (
    <PageTemplate title='Editando registro'>
      <CreateCarForm id={params.id} />
    </PageTemplate>
  );
};

export default EditPage;
