import Banner from "@/component/Banner/Banner";
import BannerList from "@/component/Banner/BannerList";
import React from "react";


export default function Home() {
    let a = [1,2,3,4];
    return (
        <main>
            <section className="banner">
                <Banner>
                    {
                        a.map((value, index, array) => {
                            return (
                                <BannerList key={index+value} value={value} index={index}></BannerList>
                            )
                        })
                    }
                </Banner>
            </section>

        </main>
    )
}
