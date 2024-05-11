import "./styles/ShareNote.css";
import html2canvas from "html2canvas";
import { useNotesContext } from "../context/ContextProvider";
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { useState } from "react";
import {
  IcBaselineMoreHoriz,
  PhXBold,
  SolarCopyOutline,
  SolarDownloadMinimalisticOutline,
} from "../utils/icons";
import { useNavigate } from "react-router-dom";

function ShareNote() {
  const { editNote: Note } = useNotesContext();
  const [shareUrl, setshareUrl] = useState("");
  const navigate = useNavigate();

  function handleDownload() {
    // html2canvas(document.querySelector(".NoteContainer"), {
    //   backgroundColor: null,
    // }).then((canvas) => {
    //   var url = canvas.toDataURL("image/png");
    //   setshareUrl(url);
    //   console.log(shareUrl);
    //   var link = document.createElement("a");
    //   link.download = "filename.png";
    //   link.href = url;
    //   link.click();
    // });

    // html2PDF(document.querySelector(".ShareNote__Canvas"), {
    //   jsPDF: {
    //     format: "a4",
    //   },
    //   imageType: "image/png",
    //   autoResize: true,
    //   margin: {
    //     top: 100,
    //     right: 100,
    //     bottom: 100,
    //     left: 100,
    //   },
    //   watermark({ pdf, pageNumber, totalPageNumber }) {
    //     // pdf: jsPDF instance
    //     pdf.setTextColor("#ddd");
    //     pdf.text(
    //       pdf.internal.pageSize.width - 50,
    //       pdf.internal.pageSize.height - 20,
    //       `QEYS ${pageNumber}/${totalPageNumber}`
    //     );
    //   },
    //   output: "generate.pdf",
    // });

    html2canvas(document.querySelector(".ShareNote__Canvas"), {
      backgroundColor: "white",
    }).then((canvas) => {
      var url = canvas.toDataURL("image/png");
      setshareUrl(url);
      navigator.clipboard.writeText(url);
      share();
    });
  }

  function share() {
    console.log(shareUrl);
    fetch(shareUrl)
      .then((res) => res.blob())
      .then((blob) => {
        // Create a file from the blob
        const file = new File([blob], `${Note.title}.png`, {
          type: "image/png",
        });

        // Share the file using react-share
        if (navigator.share) {
          navigator
            .share({
              files: [file],
              title: "Share via WhatsApp",
              text: "Check out this image!",
            })
            .then(() => console.log("Share successful"))
            .catch((error) => console.log("Share failed:", error));
        }
      })
      .catch((error) => console.error("Error fetching image:", error));
  }

  return (
    <div className="ShareNote">
      <div className="ShareNote__Background"></div>
      <div className="ShareNote__Container">
        <div className="ShareNote__Canvas__Container">
          <div className="ShareNote__Canvas">
            <div
              className="ShareNote__Canvas__Border"
              style={{
                backgroundImage: `linear-gradient(225deg, ${Note.color}, ${Note.color}44)`,
              }}
            >
              <div className="ShareNote__Canvas__Header">
                <h1>{Note.title}</h1>
              </div>
              <div className="ShareNote__Canvas__Body">
                <p>{Note.text}</p>
              </div>
            </div>
            <div className="ShareNote__Canvas__Footer">
              <p>QEYS</p>
            </div>
          </div>
        </div>
        <div className="ShareNote__Options">
          <h3>Share on</h3>
          <div className="ShareNote__Options__Buttons">
            <button onClick={handleDownload}>
              <SolarCopyOutline />
            </button>
            <button onClick={handleDownload}>
              <SolarDownloadMinimalisticOutline />
            </button>
            <button>
              <WhatsappShareButton>
                <WhatsappIcon />
              </WhatsappShareButton>
            </button>
            <button>
              <FacebookShareButton>
                <FacebookIcon />
              </FacebookShareButton>
            </button>
            <button>
              <TwitterShareButton>
                <XIcon />
              </TwitterShareButton>
            </button>
            <button>
              <PinterestShareButton>
                <PinterestIcon />
              </PinterestShareButton>
            </button>
            <button>
              <IcBaselineMoreHoriz />
            </button>
          </div>
        </div>
        <div className="ShareNote--Close">
          <button onClick={() => navigate("/Notes")} title="close">
            <PhXBold />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareNote;
