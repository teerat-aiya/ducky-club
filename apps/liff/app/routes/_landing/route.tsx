import { Outlet } from "@remix-run/react";
import { useEffect } from "react";
import { useLineLiff } from "~/contexts/LineLiffContext";
import { useLogin } from "~/hooks/auth/useLogin";
import { Loading } from "@repo/preline";

const Route = () => {
  const { liff, isLoggedIn, login, profileQuery, isInitialized } =
    useLineLiff();
  // const authen = useLogin();
  // const { data: profile, isLoading, error } = useLineProfile();

  useEffect(() => {
    if (isInitialized) {
      if (!isLoggedIn) {
        login({
          redirectUri: window.location.href,
        }).catch((err) => {
          console.error(err);
        });
      } else {
        console.log("LIFF is already logged in");
        
        // authen.mutateAsync({ IDToken: liff?.getIDToken() || "" });
      }
    }
  }, [isInitialized]);

  // useEffect(() => {
  //   if (isLoggedIn && profileQuery.data) {
  //     if (me) {
  //       if (me?.profile_picture) {
  //         const userProfile: Partial<UserProfile> = {
  //           display_name: profileQuery.data.displayName,
  //         };
  //         updateUserProfile
  //           .mutateAsync({ variables: userProfile })
  //           .catch((err) => {
  //             console.error(err);
  //           });
  //       } else {
  //         getImageFileFromURL(profileQuery.data.pictureUrl || "").then(
  //           async (file) => {
  //             if (file) {
  //               const fileName = randomHexString(32);
  //               const renamedFile = new File([file], fileName, {
  //                 type: file.type,
  //               });
  //               fileUpload.mutateAsync(
  //                 { folder: "avatar", file: renamedFile },
  //                 {
  //                   onSuccess: (data) => {
  //                     const userProfile: Partial<UserProfile> = {
  //                       display_name: profileQuery.data.displayName,
  //                       profile_picture: data.id,
  //                     };
  //                     updateUserProfile.mutateAsync(
  //                       { variables: userProfile },
  //                       {
  //                         onError: () => {
  //                           if (data.id) {
  //                             fileDelete.mutateAsync(data.id);
  //                           }
  //                         },
  //                       }
  //                     );
  //                   },
  //                   onError: (error) => {
  //                     console.error(error);
  //                   },
  //                 }
  //               );
  //             }
  //           }
  //         );
  //       }
  //     } else {
  //       getImageFileFromURL(profileQuery.data.pictureUrl || "").then(
  //         async (file) => {
  //           if (file) {
  //             const fileName = randomHexString(32);
  //             const renamedFile = new File([file], fileName, {
  //               type: file.type,
  //             });
  //             await fileUpload.mutateAsync(
  //               { folder: "avatar", file: renamedFile },
  //               {
  //                 onSuccess: (data) => {
  //                   const userProfile: Partial<UserProfile> = {
  //                     uid: profileQuery.data.userId,
  //                     display_name: profileQuery.data.displayName,
  //                     profile_picture: data.id,
  //                   };
  //                   insertUserProfile
  //                     .mutateAsync(
  //                       { variables: userProfile },
  //                       {
  //                         onSuccess: () => {
  //                           const advancedProfile: Partial<AdvancedProfile> = {
  //                             uid: profileQuery.data.userId,
  //                           };
  //                           insertAdvProfile
  //                             .mutateAsync(
  //                               { variables: advancedProfile },
  //                               {
  //                                 onSuccess: () => {
  //                                   authen.mutateAsync({
  //                                     IDToken: liff?.getIDToken() || "",
  //                                   });
  //                                 },
  //                               }
  //                             )
  //                             .catch((err) => {
  //                               console.error(err);
  //                             });
  //                         },
  //                         onError: () => {
  //                           if (data.id) {
  //                             fileDelete.mutateAsync(data.id);
  //                           }
  //                         },
  //                       }
  //                     )
  //                     .catch((err) => {
  //                       console.error(err);
  //                     });
  //                 },
  //               }
  //             );
  //           }
  //         }
  //       );
  //     }
  //   }
  // }, [me, profileQuery.data, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <main id="content">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Route;

const getImageFileFromURL = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();

    const file = new File([blob], "profile.jpg", { type: blob.type });

    return file;
  } catch (error) {
    console.error("Error fetching the image:", error);
  }
};
