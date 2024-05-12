import imgNotFound from '../../../assets/image/img.png';

function NotFoundPage(){
    return (
        <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems: 'center'}}>
            <img src={imgNotFound} style={{width: '50%'}} />
        </div>
    )
}

export default NotFoundPage;