  import {firestore} from '../../../firebase/admin';

  export default (req,res)=>{
      const id=req.query.id
      firestore
      .collection('tliters')
      .doc(id)
      .get()
      .then(doc=>{
        const data=doc.data()
        const id=doc.id
        const {createAt}=data

        res.json(
          
          {...data,
           id,
           createAt:+createAt.toDate() 
            }
        )
      }).catch(err=>{
        res.status(404).end()
      })

  };