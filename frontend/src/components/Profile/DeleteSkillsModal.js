// import React, { useState } from "react";
// import { useMutation, useQueryClient } from "react-query";
// import { Confirm, Icon } from "semantic-ui-react";
// import {  deleteSkills } from "../../Service/studentService";
// import toast from 'react-hot-toast';

// export default function DeleteSkillsModal({data}) {
//     const [SkillsList, setSkillsList] = useState([]);
//     const queryClient = useQueryClient() 
   
 
     
  
    
//     const handleDropdownChange = (event, data) => {
//       setSkillsList(data.value);
//     }; 
//     //   const {mutate} = useMutation(
//     //     ({Skills,_id}) => deleteSkills(Skills,_id)
//     //     ,
//     //     {
//     //       onSuccess: () => toast.success('Skills  deleted successfully'),
//     //       onError: () => toast.error('Oups somthing went wrong !'),
    
//     //       onSettled: () => {
//     //         queryClient.invalidateQueries('cv')
            
//     //    }
//     //     }
//     //   );
    
//     //  function handleSave (e){
//     //     e.preventDefault();

//     //  }
//   return (
//     <Modal
//     trigger={
    
//         <Icon name={"trash"} color="red" size="big"  style={{float:"right",cursor:"pointer",marginLeft:"8px"}}/>
        
//     }
   
  
//   >
 
//     <Modal.Header >{`Delete Your  Skills  Here ! `} </Modal.Header>
  
//           <Modal.Content style={{ textAlign: "center" }}>
//             <Form onSubmit={hundlSubmit}>
//               <Dropdown
//                 style={{ textAlign: "center" }}
//                 placeholder="Add more Skills Here"
//                 multiple
//                 floating
//                 search
//                 selection
//                 onChange={handleDropdownChange}
//                 options={data}
//               />

//               <br />
//               <br />

//               <Form.Checkbox label="I agree to the Terms and Conditions" />
//               <Form.Button
//                 loading={isLoading}
//                 disabled={isLoading}
//                 color={"blue"}
//               >
//                 Submit
//               </Form.Button>
//             </Form>
//           </Modal.Content>
//         </Modal>

//   )
// }
