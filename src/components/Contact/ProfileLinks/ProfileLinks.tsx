import ProfileLinkItem from "./ProfileLinkItem";
import ProfileLinkItemReplit from "./ProfileLinkItemReplit";

function ProfileLinks() {
  const sectionTitle: string  = "Links to my profiles";
  const profilesObject: any = {
    profile1: {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/dora-sukolova-94420821b/",
      image: "https://cdn4.iconfinder.com/data/icons/social-icons-16/512/LinkedIn_alt-256.png"
    },
    profile2: {
      title: "E-mail",
      href: "mailto:dsklv13@gmail.com",
      image: "https://cdn4.iconfinder.com/data/icons/logos-and-brands-1/512/147_Gmail_logo_logos-256.png"
    },
    profile3: {
      title: "GitHub",
      href: "https://github.com/d-0-t",
      image: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-256.png"
    },
    profile4: {
      title: "CodePen.io",
      href: "https://codepen.io/d-o-t",
      image: "https://cdn3.iconfinder.com/data/icons/remixicon-logos/24/codepen-line-256.png"
    },
    profile5: {
      title: "freeCodeCamp",
      href: "https://www.freecodecamp.org/d-0-t",
      image: "https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/freecodecamp-256.png"
    }
  }

  let allProfiles: any = [];

  Object.keys(profilesObject).forEach(key => {
    allProfiles.push(<ProfileLinkItem key={key} title={profilesObject[key].title} href={profilesObject[key].href} image={profilesObject[key].image} />)
  });

  return (
    <div id="page-links">
      <h2>{sectionTitle}</h2>
      <div id="contacttypes">
        {allProfiles}
        <ProfileLinkItemReplit />
      </div>
    </div>
  )
}

export default ProfileLinks;
