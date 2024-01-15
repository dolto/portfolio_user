import Banner from "@/app/component/banner";
import BannerList from "@/app/component/BannerList";
import React from "react";


export default function Home() {
    let a = [1,2,3];
    return (
        <main>
            <section className="banner">
                <Banner>
                    {
                        a.map((value, index, array) => {
                            return (
                                <BannerList key={index} props={value}></BannerList>
                            )
                        })
                    }
                </Banner>
            </section>

        </main>
    )
}
