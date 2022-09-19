import Avatar from "../Icons/Avatar";
import useTimeAgo from "../../hooks/useTimeAgo";
import Link from "next/link";
import {useRouter} from "next/router";
/* import useDateTimeFormat from "hooks/useDateTimeFormat" */

export default function Tweet({
  avatar,
  userName,
  content,
  createAt,
  img,
  id,
}) {
  const timeago = useTimeAgo(createAt)
  const router=useRouter();
 /*  const createdAtFormated = useDateTimeFormat(createdAt) */



  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
          
            <Link href={`status/${id}`}>
            <a>
            <time>{timeago}</time>
            </a>
            </Link>
            
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 1px solid #eee;
          display: flex;
          padding: 10px 15px;
          margin-top:15px;
        }
        article:hover{
          background-color: #f5f8fa;
          cursor:pointer;
        }
        img {
          border-radius: 10px;
          height: auto;
          margin-top: 10px;
          width: 100%;
        }
        div {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
        time {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}