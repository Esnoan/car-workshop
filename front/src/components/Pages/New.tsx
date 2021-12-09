import CreateCarForm from '../Organism/CreateCarForm';
import PageTemplate from '../Templates/Page';

const NewPage = () => {
  return (
    <PageTemplate title='Nuevo registro'>
      <CreateCarForm />
    </PageTemplate>
  );
};

export default NewPage;
