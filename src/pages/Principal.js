import React, { useEffect } from 'react';
import influentialPicture from '../assets/InfluentialPicture.jpg';

const Principal = () => {

    const originalWidth = 2600;
    const originalHeight = 1105;

    let currentAspectX = 1;
    let currentAspectY = 1;

    const adjustCoords = (scaleX, scaleY, isAdjusting = true) => {
        const areas = document.querySelectorAll("area");
        
        areas.forEach(area => {
            let coords = area.getAttribute("coords").split(",").map(Number);
            coords = coords.map((coord, index) => 
                index % 2 === 0 ? Math.round(isAdjusting ? coord * scaleX : coord / scaleX) : Math.round(isAdjusting ? coord * scaleY : coord / scaleY)
            );
            area.setAttribute("coords", coords.join(","));
        });
    };

    const adjustImageAndCoords = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const image = document.getElementById("image");
        image.style.width = `${windowWidth}px`;
        image.style.height = `${windowHeight}px`;

        const scaleX = windowWidth / originalWidth;
        const scaleY = windowHeight / originalHeight;

        adjustCoords(currentAspectX, currentAspectY, false);
        adjustCoords(scaleX, scaleY);

        currentAspectX = scaleX;
        currentAspectY = scaleY;
    };

    useEffect(() => {
        adjustImageAndCoords();
        window.addEventListener("resize", adjustImageAndCoords);
        
        return () => {
            window.removeEventListener("resize", adjustImageAndCoords);
        };
    }, []);

    return (
        <div>
            <img
                id="image"
                alt="Influential Picture"
                src={influentialPicture}
                useMap="#Map"
            />
            <map name="Map" >
            <area alt="Charlie Chaplin" coords="40,754,118,970" href="https://en.wikipedia.org/wiki/Charlie_Chaplin" shape="RECT" title="Charlie Chaplin" /> 
			<area alt="mike Tyson" coords="381,832,372,837,371,867,380,888,385,886,378,924,389,978,403,1012,424,1020,428,1006,432,970,445,1054,468,1077,485,1066,476,1005,525,1002,566,1022,582,980,562,958,523,907,480,854,432,844,484,856,449,840,433,849" href="https://en.wikipedia.org/wiki/Mi	ke_Tyson" shape="POLY" target="" title="Mike Tyson" /> 
			<area alt="Vladimir Putin" coords="630,769,610,783,610,818,580,845,586,923,568,948,591,984,631,1034,703,982,680,827" href="https://en.wikipedia.org/wiki/Vladimir_Putin" shape="POLY" target="_blank" title="Vladimir Putin" /> 
			<area alt="Adolf Hitler" coords="195,409,190,424,188,480,221,511,244,547,248,570,270,558,264,458,216,411" href="https://en.wikipedia.org/wiki/Adolf_Hitler" shape="POLY" target="_blank" title="Adolf Hitler" />
			<area alt="Audrey Hepburn" coords="47,423,35,441,35,458,35,478,13,492,19,525,89,506,88,488,68,438" href="https://en.wikipedia.org/wiki/Audrey_Hepburn" shape="POLY" target="_blank" title="Audrey Hepburn" /> 
			<area alt="Ludwig van Beethoven" coords="168,494,172,523,192,536,188,554,155,564,130,581,131,591,197,616,211,626,239,565,223,519,189,486" href="https://en.wikipedia.org/wiki/Ludwig_van_Beethoven" shape="POLY" target="_blank" title="Ludwig van Beethoven" /> 
			<area alt="Michael Jordan" coords="2046,544,2047,585,1977,606,1926,724,1976,732,1997,668,2030,682,2035,709,2023,744,2043,747,2053,732,2125,706,2121,599,2069,544" href="https://en.wikipedia.org/wiki/Michael_Jordan" shape="POLY" target="_blank" title="Michael Jordan" /> <area alt="Mohandas Karamchand Gandhi" coords="1707,746,1785,1097" href="https://en.wikipedia.org/wiki/Mahatma_Gandhi" shape="RECT" target="_blank" title="Mohandas Gandhi" /> 
			<area alt="Albert Einstein" coords="1000,754,971,766,968,788,933,850,925,892,936,923,960,944,1005,936,1036,1021,1084,1027,1102,1012,1142,981,1103,839,1021,763" href="https://en.wikipedia.org/wiki/Albert_Einstein" shape="POLY" target="_blank" title="Albert Einstein" /> 
			<area alt="Shirley Temple" coords="834,723,817,738,829,768,821,792,806,802,819,827,796,861,812,897,801,935,839,942,849,883,880,869,870,790,866,737,850,725" href="https://en.wikipedia.org/wiki/Shirley_Temple" shape="POLY" target="_blank" title="Shirley Temple" /> 
			<area alt="Joseph Stalin" coords="907,442,893,455,896,480,898,490,872,504,863,571,882,569,902,551,909,555,954,556,956,498,936,462,923,441" href="https://en.wikipedia.org/wiki/Joseph_Stalin" shape="POLY" target="_blank" title="Joseph Stalin" /> 
			<area alt="Che Guevara" coords="1554,219,1533,227,1529,258,1509,263,1494,318,1506,333,1545,319,1568,363,1596,344,1596,316,1608,304,1600,281" href="https://en.wikipedia.org/wiki/Che_Guevara" shape="POLY" target="_blank" title="Che Guevara" /> 
			<area alt="Marilyn Monroe" coords="1696,320,1677,340,1686,359,1686,380,1674,398,1678,405,1717,386,1721,376,1723,328,1727,345,1712,320" href="https://en.wikipedia.org/wiki/Marilyn_Monroe" shape="POLY" target="_blank" title="Marilyn Monroe" /> 
			<area alt="Marlon Brando as Don Corleone - The Godfather" coords="1680,254,1674,281,1677,297,1687,313,1672,330,1670,355,1669,388,1682,367,1675,338,1699,315,1716,316,1725,324,1735,294,1701,249" href="https://en.wikipedia.org/wiki/Marlon_Brando" shape="POLY" target="_blank" title="Marlon Brando as Don Corleone - The Godfather" /> 
			<area alt="Yasser Arafat" coords="1782,224,1754,240,1753,270,1740,293,1728,329,1727,370,1781,387,1797,397,1839,396,1839,355,1832,280" href="https://en.wikipedia.org/wiki/Yasser_Arafat" shape="POLY" target="_blank" title="Yasser Arafat" /> 
			<area alt="Ariel Sharon" coords="2088,423,2109,425,2119,448,2121,469,2146,481,2173,526,2157,553,2179,605,2153,682,2132,678,2130,602,2061,534,2062,492" href="https://en.wikipedia.org/wiki/Ariel_Sharon" shape="POLY" target="_blank" title="Ariel Sharon" /> 
			<area alt="Mother Teresa" coords="2322,381,2303,398,2303,427,2322,452,2352,438,2336,421,2338,391" href="https://en.wikipedia.org/wiki/Mother_Teresa" shape="POLY" target="_blank" title="Mother Teresa" /> 
			<area alt="Mikhail Gorbachev" coords="2291,344,2276,354,2281,371,2319,375,2364,359,2340,315" href="https://en.wikipedia.org/wiki/Mikhail_Gorbachev" shape="POLY" target="_blank" title="Mikhail Gorbachev" /> 
			<area alt="Osama bin Laden" coords="2029,170,2028,209,2035,264,2070,288,2072,230,2060,173,2043,165" href="https://en.wikipedia.org/wiki/Osama_bin_Laden" shape="POLY" target="_blank" title="Osama bin Laden" /> 
			<area alt="Liu Xiang" coords="2147,232,2083,266,2081,331,2108,329,2123,332,2133,342,2158,335,2167,298,2180,298,2203,321,2211,312" href="https://en.wikipedia.org/wiki/Liu_Xiang_(hurdler)" shape="POLY" target="_blank" title="Liu Xiang" /> 
			<area alt="Luciano Pavarotti" coords="1986,320,1969,337,1974,353,1948,372,1857,449,1875,470,1912,435,1931,418,1964,373,1989,391,1995,414,2018,413,2008,381,2043,375,2011,355,2004,321" href="https://en.wikipedia.org/wiki/Luciano_Pavarotti" shape="POLY" target="_blank" title="Luciano Pavarotti" /> 
			<area alt="George W. Bush" coords="2021,267,2008,287,1935,296,1936,307,1950,305,1962,349,1967,325,2003,315,2014,342,2033,365,2067,360,2067,318,2044,277" href="https://en.wikipedia.org/wiki/George_W._Bush" shape="POLY" target="_blank" title="George W Bush" /> 
			<area alt="Charles, Prince of Wales" coords="2095,335,2085,350,2103,387,2087,399,2084,421,2116,419,2129,465,2172,504,2188,422,2165,377,2123,372,2118,338" href="https://en.wikipedia.org/wiki/Charles_III" shape="POLY" target="_blank" title="Prince Charles" /> 
			<area alt="Kofi Annan" coords="2174,307,2163,331,2167,351,2137,350,2137,366,2152,367,2172,374,2188,406,2222,399,2225,365,2200,350,2196,318,2183,305" href="https://en.wikipedia.org/wiki/Kofi_Annan" shape="POLY" target="_blank" title="Kofi Annan" /> 
			<area alt="Saddam Hussein" coords="359,471,339,474,332,501,332,513,318,520,308,562,284,559,267,563,271,578,297,583,389,586,387,530,358,517,371,501,373,475" href="https://en.wikipedia.org/wiki/Saddam_Hussein" shape="POLY" target="_blank" title="Saddam Hussein" /> 
			<area alt="Bruce Lee" coords="689,159,701,192,675,211,659,239,688,257,655,310,657,360,677,355,706,293,722,304,738,277,740,208,775,199,780,161,762,156,762,188,737,202,718,178,718,153" href="https://en.wikipedia.org/wiki/Bruce_Lee" shape="POLY" target="_blank" title="Bruce Lee" /> 
			<area alt="Karl Marx" coords="1085,422,1063,440,1071,458,1049,476,1067,500,1079,539,1123,539,1127,497,1106,472,1113,429" href="https://en.wikipedia.org/wiki/Karl_Marx" shape="POLY" target="_blank" title="Karl Marx" /> 
			<area alt="Abraham Lincoln" coords="1329,397,1311,416,1318,447,1319,466,1297,475,1270,527,1282,555,1307,551,1338,550,1338,531,1353,509,1380,469,1353,452,1350,412" href="http://en.wikipedia.org/wiki/Abraham_Lincoln" shape="POLY" target="_blank" title="Abraham Lincoln" /> <area alt="Dante" coords="2455,64,2542,178" href="https://en.wikipedia.org/wiki/Dante_Alighieri" shape="RECT" target="_blank" title="Dante" /> 
			<area alt="Fidel Castro" coords="1652,212,1629,216,1622,244,1596,250,1592,259,1613,293,1642,299,1645,329,1661,377,1671,318,1671,272,1671,258" href="https://en.wikipedia.org/wiki/Fidel_Castro" shape="POLY" target="_blank" title="Fidel Castro" /> 
			<area alt="Napoleon I of France" coords="1397,150,1361,178,1377,187,1358,198,1332,226,1365,282,1279,306,1264,360,1329,359,1343,329,1369,319,1390,339,1392,360,1445,343,1463,299,1488,273,1503,216" href="https://en.wikipedia.org/wiki/Napoleon" shape="POLY" target="_blank" title="Napoleon" /> 
			<area alt="Franklin D. Roosevelt" coords="730,395,715,411,718,432,695,453,711,478,745,499,776,483,780,443,746,399" href="https://en.wikipedia.org/wiki/Franklin_D._Roosevelt" shape="POLY" target="_blank" title="Franklin D. Roosevelt" /> 
			<area alt="William Shakespeare" coords="989,327,974,340,975,370,956,390,958,407,964,415,958,437,970,456,981,448,1035,440,1047,395,1018,375,1025,359,1003,329" href="https://en.wikipedia.org/wiki/William_Shakespeare" shape="POLY" target="_blank" title="Shakespeare" /> 
			<area alt="Winston Churchill" coords="778,226,762,234,756,259,759,276,740,281,712,339,755,371,837,352,823,287,787,277,796,250" href="https://en.wikipedia.org/wiki/Winston_Churchill" shape="POLY" target="_blank" title="Winston Churchill" /> 
			<area alt="Elizabeth II of the United Kingdom" coords="840,532,816,528,809,540,808,558,808,573,815,580,779,606,771,644,774,661,747,692,728,732,754,740,755,764,814,761,806,738,827,716,830,688,870,670,880,629" href="https://en.wikipedia.org/wiki/Elizabeth_II" shape="POLY" target="_blank" title="Elizabeth II" /> 
			<area alt="Pelé" coords="163,259,143,266,141,284,115,297,86,322,68,374,60,396,138,401,141,473,148,491,161,480,170,373,190,388,189,304" href="https://en.wikipedia.org/wiki/Pele" shape="POLY" target="_blank" title="Pelé" /> 
			<area alt="Vladimir Lenin" coords="282,140,274,162,282,172,274,182,257,192,239,224,241,241,288,230,291,262,338,257,334,206,436,155,427,145" href="https://en.wikipedia.org/wiki/Vladimir_Lenin" shape="POLY" target="_blank" title="Vladimir Lenin" /> 
			<area alt="Charles Darwin" coords="1499,731,1431,746,1427,766,1480,813,1466,840,1425,856,1418,877,1456,881,1502,905,1489,958,1499,1071,1462,1094,1527,1093,1571,1041,1594,1054,1615,1010,1657,923,1562,776,1533,769,1521,733" href="https://en.wikipedia.org/wiki/Charles_Darwin" shape="POLY" target="_blank" title="Charles Darwin or Noah" /> 
			<area alt="Deng Xiaoping" coords="602,480,582,492,584,523,579,538,574,549,529,576,529,590,571,590,624,605,643,586,643,548,614,494" href="https://en.wikipedia.org/wiki/Deng_Xiaoping" shape="POLY" target="_blank" title="Deng Xiaoping" /> 
			<area alt="Benito Mussolini" coords="296,474,286,503,270,507,275,558,303,559,311,521,325,485" href="https://en.wikipedia.org/wiki/Benito_Mussolini" shape="POLY" target="_blank" title="Benito Mussolini" /> 
			<area alt="Sun Yat-sen" coords="549,398,533,408,533,434,535,451,519,459,519,482,514,508,501,522,533,566,558,552,576,528,577,490,588,467,561,440,567,422" href="https://en.wikipedia.org/wiki/Sun_Yat-sen" shape="POLY" target="_blank" title="Sun Yat-sen" /> 
			<area alt="Empress Dowager Cixi" coords="2046,385,2027,394,2033,417,2036,434,2019,449,2003,491,2005,547,2018,556,2015,576,2047,582,2049,538,2071,434,2060,395" href="https://en.wikipedia.org/wiki/Empress_Dowager_Cixi" shape="POLY" target="_blank" title="Empress Dowager Cixi" /> 
			<area alt="Guan Yu" coords="268,313,250,339,248,362,233,379,222,408,246,428,276,465,315,466,337,444,338,419,334,363,318,277,292,266,311,363" href="https://en.wikipedia.org/wiki/Guan_Yu" shape="POLY" target="_blank" title="Guan Yu" /> 
			<area alt="Lei Feng" coords="190,674,240,878" href="https://en.wikipedia.org/wiki/Lei_Feng" shape="RECT" target="_blank" title="Lei Feng" />
			<area alt="Zhou Enlai" coords="1455,332,1448,346,1449,364,1427,381,1425,420,1446,439,1452,454,1471,461,1495,469,1499,447,1516,386,1477,334" href="https://en.wikipedia.org/wiki/Zhou_Enlai" shape="POLY" target="_blank" title="Zhou Enlai" /> 
			<area alt="Mao Zedong" coords="1412,426,1397,440,1395,471,1393,483,1347,525,1345,552,1366,552,1402,594,1434,635,1472,578,1466,498,1436,467,1436,434" href="https://en.wikipedia.org/wiki/Mao_Zedong" shape="POLY" target="_blank" title="Mao Zedong" /> 
			<area alt="Elvis Presley" coords="853,358,850,399,838,416,826,436,829,477,856,497,887,490,888,461,903,440,928,437,945,438,969,295,959,294,927,392,876,400,883,362" href="https://en.wikipedia.org/wiki/Elvis_Presley" shape="POLY" target="_blank" title="Elvis Presley" /> 
			<area alt="Confucius" coords="1604,687,1597,720,1573,773,1587,823,1686,927,1695,797,1663,723,1636,678" href="https://en.wikipedia.org/wiki/Confucius" shape="POLY" target="_blank" title="Confucius" /> 
			<area alt="Genghis Khan" coords="1205,109,1179,167,1188,203,1174,244,1148,269,1066,216,1030,256,1020,286,1042,300,1070,279,1073,296,1092,328,1123,353,1251,355,1269,297,1305,275,1299,241,1237,265,1237,212" href="https://en.wikipedia.org/wiki/Genghis_Khan" shape="POLY" target="_blank" title="Genghis Khan" /> 
			<area alt="Peter I the Great" coords="528,232,581,322" href="https://en.wikipedia.org/wiki/Peter_I_of_Russia" shape="RECT" target="_blank" title="Peter the Great" /> 
			<area alt="Qin Shi Huang" coords="2230,373,2235,399,2267,442,2253,477,2245,507,2240,561,2267,476,2288,483,2259,592,2252,648,2257,648,2260,660,2279,628,2315,588,2322,525,2321,452,2295,418,2288,377" href="https://en.wikipedia.org/wiki/Qin_Shi_Huang" shape="POLY" target="_blank" title="Qin Shi Huang" /> 
			<area alt="Margaret Thatcher" coords="602,299,590,320,595,349,586,363,570,399,571,436,610,433,629,412,620,381,624,359,624,339,632,325,630,301" href="https://en.wikipedia.org/wiki/Margaret_Thatcher" shape="POLY" target="_blank" title="Margaret Thatcher" /> 
			<area alt="Wolfgang Amadeus Mozart" coords="1046,340,1044,369,1029,375,1053,392,1045,419,1061,433,1083,416,1117,417,1161,366,1067,333" href="https://en.wikipedia.org/wiki/Wolfgang_Mozart" shape="POLY" target="_blank" title="Mozart" /> 
			<area alt="Bill Clinton" coords="446,217,456,251,444,259,466,340,484,354,493,313,504,280,518,273,508,197" href="https://en.wikipedia.org/wiki/Bill_Clinton" shape="POLY" target="_blank" title="Bill Clinton" /> 
			<area alt="Vincent van Gogh" coords="1906,720,1876,752,1865,786,1845,856,1863,904,1866,1079,1974,1075,1947,923,1955,863,1972,794,1948,730" href="https://en.wikipedia.org/wiki/Vincent_van_Gogh" shape="POLY" target="_blank" title="Vincent van Gogh" /> 
			<area alt="Corneliu Baba" coords="1690,619,1756,728" href="https://en.wikipedia.org/wiki/Corneliu_Baba" shape="RECT" target="_blank" title="Corneliu Baba" /> 
			<area alt="Marcel Duchamp" coords="2041,774,2187,921" href="https://en.wikipedia.org/wiki/Marcel_Duchamp" shape="RECT" target="_blank" title="Marcel Duchamp" /> 
			<area alt="Leonardo da Vinci" coords="959,459,1048,535" href="https://en.wikipedia.org/wiki/Leonardo_da_Vinci" shape="RECT" target="_blank" title="Leonardo da Vinci" /> 
			<area alt="Maxim Gorky" coords="405,470,491,615" href="https://en.wikipedia.org/wiki/Maxim_Gorky" shape="RECT" target="_blank" title="Maxim Gorky" /> 
			<area alt="Aristotle" coords="2329,583,2276,643,2239,864,2387,874,2389,649,2358,591" href="https://en.wikipedia.org/wiki/Aristotle" shape="POLY" target="_blank" title="Aristotle" /> 
			<area alt="Leo Tolstoy" coords="878,639,988,750" href="https://en.wikipedia.org/wiki/Leo_Tolstoy" shape="RECT" target="_blank" title="Leo Tolstoy" /> 
			<area alt="Lol Cat - Im ridin in a kamel pockits" coords="1784,503,1831,573" href="http://en.wikipedia.org/wiki/Lolcat" shape="RECT" target="_blank" title="lol cat" /> 
			<area alt="Charles de Gaulle" coords="498,335,508,371,494,407,515,445,527,446,532,401,539,382,546,356,530,326" href="https://en.wikipedia.org/wiki/Charles_de_Gaulle" shape="POLY" target="_blank" title="Charles de Gaulle" /> 
			<area alt="Ramesses II" coords="360,290,453,430" href="https://en.wikipedia.org/wiki/Ramesses_II" shape="RECT" target="_blank" title="Ramesses II" /> 
			<area alt="Pavel Korchagin" coords="347,205,403,257" href="https://en.wikipedia.org/wiki/Pavel_Korchagin" shape="RECT" target="_blank" title="Pavel Korchagin" />
			<area alt="Henry Ford" coords="121,742,189,896" href="https://en.wikipedia.org/wiki/Henry_Ford" shape="RECT" target="_blank" title="Henry Ford" /> 
			<area alt="Sigmund Freud" coords="441,663,512,785" href="https://en.wikipedia.org/wiki/Sigmund_Freud" shape="RECT" target="_blank" title="Sigmund Freud" /> 
			<area alt="Norman Bethune" coords="300,594,389,815" href="https://en.wikipedia.org/wiki/Norman_Bethune" shape="RECT" target="_blank" title="Norman Bethune" /> 
			<area alt="Lewis Carroll" coords="702,828,796,977" href="https://en.wikipedia.org/wiki/Lewis_Carroll" shape="RECT" target="_blank" title="Lewis Carroll" /> 
			<area alt="Henri de Toulouse-Lautrec" coords="1988,709,1967,769,1976,798,1961,857,1970,910,2016,926,2040,844,2036,800,2020,739,2010,703" href="https://en.wikipedia.org/wiki/Henri_de_Toulouse-Lautrec" shape="POLY" target="_blank" title="Henri de Toulouse-Lautrec" /> 
			<area alt="Friedrich Nietzsche" coords="1130,439,1118,472,1125,484,1134,537,1218,539,1205,480" href="https://en.wikipedia.org/wiki/Friedrich_Nietzsche" shape="POLY" target="_blank" title="Friedrich Nietzsche" /> 
			<area alt="Michelangelo" coords="1786,666,1845,911" href="https://en.wikipedia.org/wiki/Michelangelo" shape="RECT" target="_blank" title="Michelangelo" /> 
			<area alt="Otto von Bismarck" coords="2411,343,2475,414" href="https://en.wikipedia.org/wiki/Otto_von_Bismarck" shape="RECT" target="_blank" title="Otto von Bismarck" /> 
			<area alt="Salvador Dalí" coords="1960,381,1913,443,1903,538,1915,626,1975,601,1994,583,2002,466,2014,424,1987,416,1986,401,1978,385" href="https://en.wikipedia.org/wiki/Salvador_Dali" shape="POLY" target="_blank" title="Salvador Dalí" /> 
			<area alt="Julius Caesar" coords="1846,253,1893,337" href="https://en.wikipedia.org/wiki/Julius_Caesar" shape="RECT" target="_blank" title="Julius Caesar" /> 
			<area alt="Ernest Hemingway" coords="793,418,806,476,826,474,823,434,828,426,816,409" href="https://en.wikipedia.org/wiki/Ernest_Hemingway" shape="POLY" target="_blank" title="Ernest Hemingway" /> 
			<area alt="J. Robert Oppenheimer" coords="886,328,925,392" href="https://en.wikipedia.org/wiki/J._Robert_Oppenheimer" shape="RECT" target="_blank" title="J. Robert Oppenheimer" />
			<area alt="Plato" coords="119,113,181,215" href="https://en.wikipedia.org/wiki/plato" shape="RECT" target="" title="Plato" /> 
			<area alt="Bill Gates" coords="45,177,119,293" href="https://en.wikipedia.org/wiki/Bill_Gates" shape="RECT" target="_blank" title="Bill Gates" /> 
			<area alt="" coords="531,654,668,765" href="https://en.wikipedia.org/wiki/Jack_Kevorkian" shape="RECT" target="_blank" title="Jack Kevorkian" /> 
			<area alt="Steven Spielberg" coords="1162,397,1159,446,1188,464,1215,422,1201,399,1201,378,1172,391" href="https://en.wikipedia.org/wiki/Steven_Spielberg" shape="POLY" target="_blank" title="Steven Spielberg" /> 
			<area alt="Chiang Kai-shek" coords="678,566,746,695" href="https://en.wikipedia.org/wiki/Chiang_Kai-shek" shape="RECT" target="_blank" title="Chiang Kai-shek" /> 
			<area alt="Liu Bei" coords="2464,571,2402,684,2429,882,2588,877,2575,748,2578,626,2517,634,2494,619,2499,581,2480,557,2477,563" href="https://en.wikipedia.org/wiki/Liu_Bei" shape="POLY" target="_blank" title="Liu Bei" />
			<area alt="Pablo Picasso" coords="1221,389,1222,428,1204,454,1205,475,1223,499,1236,521,1276,508,1279,486,1291,475,1276,439,1252,432,1256,394,1237,385" href="https://en.wikipedia.org/wiki/Pablo_Picasso" shape="POLY" target="_blank" title="Pablo Picasso" /> 
			<area alt="Henri Matisse" coords="821,161,916,264" href="https://en.wikipedia.org/wiki/Henri_Matisse" shape="RECT" target="_blank" title="Henri Matisse" />
			<area alt="General Claire Lee Chennault" coords="1898,311,1898,343,1858,394,1876,421,1960,360,1928,349,1934,329,1927,310,1913,302,1903,303" href="https://en.wikipedia.org/wiki/Claire_Lee_Chennault" shape="POLY" target="_blank" title="General Claire Lee Chennault" /> 
			<area alt="Rabindranath Tagore" coords="2377,419,2373,459,2345,491,2347,581,2379,599,2433,569,2443,479,2407,457,2405,419,2393,413,2381,411" href="https://en.wikipedia.org/wiki/Rabindranath_Tagore" shape="POLY" target="_blank" title="Rabindranath Tagore" /> 
			<area alt="Jean-Jacques Rousseau" coords="2555,385,2539,419,2521,435,2511,465,2537,493,2525,537,2553,561,2571,593,2589,587,2593,501,2579,397,2573,389" href="https://en.wikipedia.org/wiki/Jean-Jacques_Rousseau" shape="POLY" target="_blank" title="Jean-Jacques Rousseau" /> <area alt="Cui Jian " coords="187,138,239,272" href="https://en.wikipedia.org/wiki/Cui_Jian" shape="RECT" target="_blank" title="Cui Jian - Father of Chinese Rock N Roll" /> 
			<area alt="Li Bai" coords="1135,684,1183,732,1185,768,1127,798,1125,846,1209,872,1275,842,1323,821,1393,755,1413,783,1429,751,1439,713,1443,683,1467,667,1437,649,1367,707,1345,677,1313,691,1307,713,1255,721,1163,659" href="https://en.wikipedia.org/wiki/Li_Bai" shape="POLY" target="_blank" title="Li Bai" /> 
			<area alt="Lao tzu" coords="1598,318,1604,340,1574,376,1568,442,1640,454,1662,410,1650,366,1634,352,1638,312,1618,302,1610,304" href="https://en.wikipedia.org/wiki/Laozi" shape="POLY" target="_blank" title="Lao tzu" /> 
			<area alt="Hideki Tojo" coords="2191,553,2203,587,2209,657,2211,723,2157,723,2129,757,2161,771,2177,757,2253,743,2259,671,2249,649,2247,599,2259,571,2281,503,2285,487,2267,483,2267,515,2247,549,2239,563,2237,543,2213,543" href="https://en.wikipedia.org/wiki/Hideki_Tojo" shape="POLY" target="_blank" title="Hideki Tojo" /> 
			<area alt="Qi Baishi" coords="2194,410,2204,446,2182,474,2184,516,2224,530,2238,504,2238,482,2250,450,2240,418,2228,400" href="https://en.wikipedia.org/wiki/Qi_Baishi" shape="POLY" target="_blank" title="Qi Baishi" /> 
			<area alt="Run Run Shaw" coords="2487,422,2443,442,2445,470,2459,498,2447,556,2401,602,2391,628,2409,652,2469,552,2483,548,2503,574,2521,576,2521,522,2529,496,2507,472,2519,424,2503,414" href="https://en.wikipedia.org/wiki/Run_Run_Shaw" shape="POLY" target="_blank" title="Run Run Shaw" /> 
			<area coords="2339,114,2405,198" href="https://cliptank.com/history-painting-famous-answers.html#artists" shape="RECT" target="_blank" title="Original Artist - Dai Dudu" /> 
			<area coords="2263,96,2333,174" href="https://cliptank.com/history-painting-famous-answers.html#artists" shape="RECT" target="_blank" title="Original Artist - Li Tiezi" /> 
			<area coords="2493,190,2591,286" href="https://cliptank.com/history-painting-famous-answers.html#artists" shape="RECT" target="_blank" title="Original Artist - Zhang An" /> 
			<area alt="Alexander Pushkin" coords="634,431,696,535" href="https://en.wikipedia.org/wiki/Alexander_Pushkin" shape="RECT" target="_blank" title="Alexander Pushkin" /> 
			<area alt="Alfred Nobel" coords="693,348,677,368,627,354,623,382,635,414,689,422,701,428,713,398,727,386,715,364,717,346" href="https://en.wikipedia.org/wiki/Alfred_Nobel" shape="POLY" target="_blank" title="Alfred Nobel" /> 
			<area alt="Marie Curie" coords="1347,330,1353,368,1337,394,1355,412,1361,438,1391,442,1407,422,1419,400,1385,378,1383,338,1367,324" href="https://en.wikipedia.org/wiki/Marie_Curie" shape="POLY" target="_blank" title="Marie Curie" /> 
			<area alt="Johann Wolfgang von Goethe" coords="1538,324,1562,362,1568,414,1524,398,1520,382,1534,372,1512,336" href="https://en.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe" shape="POLY" target="_blank" title="Johann Wolfgang von Goethe" /> 
			<area alt="Lu Xun" coords="816,477,790,493,752,529,748,575,776,591,804,573,808,527,828,523,844,499,834,483" href="https://en.wikipedia.org/wiki/Lu_Xun" shape="POLY" target="_blank" title="Lu Xun" /> 
			<area alt="Sòng Qìnglíng" coords="2351,367,2401,411" href="https://en.wikipedia.org/wiki/Soong_Ching-ling" shape="RECT" target="_blank" title="Sòng Qìnglíng" /> 
			<area alt="Dwight D. Eisenhower" coords="1825,573,1895,663" href="https://en.wikipedia.org/wiki/Dwight_D._Eisenhower" shape="RECT" target="_blank" title="Dwight D. Eisenhower" /> 
			<area alt="Dolly the Cloned Sheep" coords="1791,912,1861,1090" href="https://en.wikipedia.org/wiki/Dolly_(sheep)" shape="RECT" target="_blank" title="Dolly the Cloned Sheep" /> 
			<area alt="LOL Cat - I emms lookinn at ur heds" coords="3,645,85,717" href="http://en.wikipedia.org/wiki/Lolcat" shape="rect" target="_blank" title="LOL Cat" /> 
			<area alt="click to see who people think the camel looks like." coords="1544,572,67" href="http://cliptank.com/famous-camel-look-alike.htm" shape="circle" target="_parent" title="Celerbrities that look like camels" /> 
			<area alt="Ol' Roy (Sam Walton's dog)" coords="1386,918,1477,1048" href="https://en.wikipedia.org/wiki/Sam_Walton" shape="rect" target="_blank" title="Ol' Roy (Sam Walton's dog)" /> 
			<area alt="Great Pyramids of Giza" coords="1579,86,1946,171" href="https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza" shape="rect" target="_blank" title="Great Pyramids of Giza" /> 
			<area alt="Christopher Columbus and the Santa Maria" coords="510,133,511,88,666,83,754,141,689,153,681,167,689,190,648,235,646,245,679,261,652,294,590,279,587,229,548,224" href="https://en.wikipedia.org/wiki/Santa_Mar%C3%ADa_(ship)" shape="poly" target="_blank" title="Christopher Columbus and the Santa Maria" /> 
			<area alt="Ford Model T" coords="185,949,253,1002" href="http://en.wikipedia.org/wiki/Ford_Model_T" shape="rect" target="_blank" title="Ford Model T" /> 
			<area alt="Phonograph" coords="10,979,137,1100" href="http://en.wikipedia.org/wiki/Phonograph" shape="rect" target="_blank" title="Phonograph" /> 
			<area alt="Atomic bombings of Hiroshima and Nagasaki" coords="35,557,36,639,83,638,112,620,108,525,70,526" href="https://en.wikipedia.org/wiki/Atomic_bombings_of_Hiroshima_and_Nagasaki" shape="poly" target="_blank" title="Atomic bombings of Hiroshima and Nagasaki" /> 
			<area alt="Typewriter" coords="1214,610,1288,671" href="http://en.wikipedia.org/wiki/Typewriter" shape="rect" target="_blank" title="Typewriter" />
			<area alt="Gutenberg Bible" coords="1100,641,1133,623,1159,654,1117,677" href="http://en.wikipedia.org/wiki/Gutenberg_Bible" shape="poly" target="_blank" title="Gutenberg Bible" /> 
			<area alt="Easter Island statues (moai) created by the Rapanui" coords="40,265,6,262,7,168,45,140,92,151,83,171,44,176,41,217" href="https://en.wikipedia.org/wiki/Easter_Island" shape="poly" target="_blank" title="Easter Island statues (moai) created by the Rapanui" /> 
			<area alt="Easter Island statues (moai) created by the Rapanui" coords="359,200,437,158,498,167,497,184,414,225,409,203" href="https://en.wikipedia.org/wiki/Easter_Island" shape="poly" target="_blank" title="Easter Island statues (moai) created by the Rapanui" /> 
			<area alt="Stonehenge" coords="1220,149,1241,203,1349,196,1359,171,1394,143,1486,192,1554,193,1556,136,1295,139" href="https://en.wikipedia.org/wiki/Stonehenge" shape="poly" target="_blank" title="Stonehenge" /> 
			<area alt="Houri - The concept of 72 virgins in Islam refers to an aspect of paradise" coords="1627,176,1628,191,1744,242,1781,221,1827,256,1843,246,1895,251,1903,286,1933,291,1962,278,1952,215,1926,196,1874,183" href="https://en.wikipedia.org/wiki/Houri" shape="poly" target="_blank" title="Houri - The concept of 72 virgins in Islam refers to an aspect of paradise" /> 
			<area alt="Photo by Cartier-Bresson Srinagar, Kashmir, 1948" coords="1951,185,1942,200,1958,211,1967,273,1998,281,2017,263,2026,253,2016,176,1988,172" href="http://www.afterimagegallery.com/bressonsrinagar.htm" shape="poly" target="_blank" title="Photo by Cartier-Bresson Srinagar, Kashmir, 1948" /> 
			<area alt="The Flag of the Kingdom of Castile and Leon 1230-1516" coords="636,36,696,80" href="http://flagspot.net/flags/es-cl_hi" shape="rect" target="_blank" title="The Flag of the Kingdom of Castile and Leon 1230-1516" /> 
			<area alt="Golden Eagle" coords="893,114,935,177,973,205,975,224,1000,246,1022,214,1069,210,1099,229,1149,232,1149,206,1039,181" href="https://en.wikipedia.org/wiki/Golden_eagle" shape="poly" target="_blank" title="Golden Eagle" /> 
			<area alt="Great Wall of China" coords="2164,209,2175,248,2183,271,2207,293,2227,311,2231,348,2261,351,2337,309,2347,308,2369,349,2399,355,2406,338,2472,333,2459,261,2389,216,2261,199,2212,198" href="http://en.wikipedia.org/wiki/Great_Wall_of_China" shape="poly" target="_blank" title="Great Wall of China" /> 
			<area alt="The Tian'anmen or &quot;Gate of Heavenly Peace&quot;" coords="2095,111,2251,175" href="https://en.wikipedia.org/wiki/Tiananmen" shape="rect" target="_blank" title="The Tiananmen or &quot;Gate of Heavenly Peace&quot;" /> 
			<area alt="Alberto Santos-Dumont" coords="1150,547,1212,584" href="https://en.wikipedia.org/wiki/Alberto_Santos_Dumont" shape="rect" target="_blank" title="Alberto Santos-Dumont" />
            </map>
        </div>
    );
};

export default Principal;