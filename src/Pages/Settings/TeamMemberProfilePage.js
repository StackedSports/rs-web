import { useParams } from 'react-router-dom';

const TeamMemberProfilePage = (props) => {

  const { id } = useParams();
  console.log(id)

  return (
    <h1>{id}</h1>
  )
}

export default TeamMemberProfilePage;