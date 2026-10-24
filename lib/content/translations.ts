import type { Locale } from '@/lib/locales';

export interface GuideTranslation {
 title: string; description: string; summary: string; location: string; targets: string[];
 setup: string; version: string; faq: {question: string; answer: string}[];
 sourceUpdatedAt: string; translatedAt: string;
}
export const translations: Record<Locale, Record<string, GuideTranslation>> = {
  "es": {
    "firelands-volatile-farm": {
      "title": "Farm de Volátiles en Tierras de Fuego: ruta sin matar jefes",
      "description": "Farmea los enemigos normales de Tierras de Fuego con Poción de búsqueda de tesoros para conseguir Aire, Vida y Agua volátiles. Deja vivos a todos los jefes.",
      "summary": "Limpia los enemigos normales con la poción activa, guarda los tres materiales volátiles y deja vivos a todos los jefes.",
      "location": "Tierras de Fuego (Firelands), Monte Hyjal",
      "targets": [
        "Aire volátil (Volatile Air)",
        "Vida volátil (Volatile Life)",
        "Agua volátil (Volatile Water)"
      ],
      "setup": "Poción de búsqueda de tesoros, bolsas vacías y un personaje capaz de limpiar los grupos.",
      "version": "Vídeo del 3 de agosto de 2018. Comprueba los botines, reinicios y precios de tu versión; no es una medición actual.",
      "faq": [
        {
          "question": "¿Qué debo llevar?",
          "answer": "Lleva Poción de búsqueda de tesoros, bolsas vacías y un personaje capaz de limpiar los enemigos normales. Compara el coste de la poción con el precio de los tres Volátiles."
        },
        {
          "question": "¿Debo matar a los jefes?",
          "answer": "No. Deja vivos a todos los jefes y mantén tus grupos y ataques de área lejos de ellos. Sal y reinicia cuando el juego lo permita."
        },
        {
          "question": "¿Cómo calculo el beneficio?",
          "answer": "Cuenta los materiales que recojas y vendas y resta el coste de la poción. Abre los cofres y separa los objetos sin vender del oro recibido."
        }
      ],
      "sourceUpdatedAt": "2026-10-21",
      "translatedAt": "2026-10-23"
    },
    "burning-steppes-mageweave-runecloth-farm": {
      "title": "Farm de Paño de tejido mágico y Paño rúnico en Las Estepas Ardientes",
      "description": "Sigue la ruta de cuatro grupos de King K en Las Estepas Ardientes para conseguir Paño de tejido mágico y Paño rúnico. Usa daño de área y recoge el botín.",
      "summary": "Recorre cuatro grupos en sentido contrario a las agujas del reloj. Recoge el botín antes de que desaparezca y cuenta la transfiguración aparte de los paños.",
      "location": "Las Estepas Ardientes (Burning Steppes), Reinos del Este",
      "targets": [
        "Paño de tejido mágico (Mageweave Cloth)",
        "Paño rúnico (Runecloth)"
      ],
      "setup": "Daño de área y bolsas vacías. Una montura con vendedor y TradeSkillMaster son opcionales.",
      "version": "Vídeo del 11 de marzo de 2017. Las cantidades y precios describen aquella grabación, no una prueba del parche actual.",
      "faq": [
        {
          "question": "¿Cómo recorro la ruta?",
          "answer": "Recorre los cuatro grupos del vídeo en sentido contrario a las agujas del reloj, incluido el que está detrás de la colina. Usa daño de área, recoge el botín y sigue moviéndote."
        },
        {
          "question": "¿Necesito un pícaro o una montura con vendedor?",
          "answer": "Uso Abanico de cuchillos con mi pícaro, pero basta con tener daño de área adecuado. La montura con vendedor es opcional y facilita vaciar las bolsas."
        },
        {
          "question": "¿Incluyo la transfiguración en el oro por hora de los paños?",
          "answer": "No; cuéntala aparte. Puede tardar meses en venderse. Comprueba el precio actual de los paños y cuenta tus propios botines."
        }
      ],
      "sourceUpdatedAt": "2026-10-21",
      "translatedAt": "2026-10-23"
    }
  },
  "de": {
    "firelands-volatile-farm": {
      "title": "Flüchtige Elemente in den Feuerlanden farmen: Route ohne Bosskills",
      "description": "Farme normale Gegner in den Feuerlanden mit einem Trank des Schätzefindens für flüchtige Luft, Leben und Wasser. Lass alle Bosse am Leben.",
      "summary": "Farme die normalen Gegner mit aktivem Trank, behalte die drei flüchtigen Materialien und lass jeden Boss am Leben.",
      "location": "Feuerlande (Firelands), Hyjal",
      "targets": [
        "Flüchtige Luft (Volatile Air)",
        "Flüchtiges Leben (Volatile Life)",
        "Flüchtiges Wasser (Volatile Water)"
      ],
      "setup": "Trank des Schätzefindens, leere Taschen und ein Charakter, der die Gegnergruppen schafft.",
      "version": "Video vom 3. August 2018. Prüfe Beute, Zurücksetzen und Preise in deiner Spielversion; dies ist kein aktueller Test.",
      "faq": [
        {
          "question": "Was soll ich mitbringen?",
          "answer": "Bring einen Trank des Schätzefindens, leere Taschen und einen geeigneten Charakter mit. Vergleiche die Trankkosten mit den Preisen der drei flüchtigen Materialien."
        },
        {
          "question": "Soll ich Bosse töten?",
          "answer": "Nein. Lass alle Bosse am Leben und halte deine Gruppen und Flächenangriffe von ihnen fern. Verlasse und setze die Instanz zurück, wenn das Spiel es erlaubt."
        },
        {
          "question": "Wie berechne ich den Gewinn?",
          "answer": "Zähle die tatsächlich gesammelten und verkauften Materialien und ziehe die Trankkosten ab. Öffne die Schatztruhen und trenne unverkaufte Gegenstände vom erhaltenen Gold."
        }
      ],
      "sourceUpdatedAt": "2026-10-21",
      "translatedAt": "2026-10-23"
    },
    "burning-steppes-mageweave-runecloth-farm": {
      "title": "Magiestoff und Runenstoff in der Brennenden Steppe farmen",
      "description": "King Ks Route durch vier Gegnergruppen in der Brennenden Steppe für Magiestoff und Runenstoff. Nutze Flächenschaden und sammle die Beute rechtzeitig ein.",
      "summary": "Arbeite die vier Gruppen gegen den Uhrzeigersinn ab. Sammle Beute vor dem Verschwinden der Leichen ein und zähle Transmog getrennt von den Stoffen.",
      "location": "Brennende Steppe (Burning Steppes), Östliche Königreiche",
      "targets": [
        "Magiestoff (Mageweave Cloth)",
        "Runenstoff (Runecloth)"
      ],
      "setup": "Flächenschaden und leere Taschen. Ein Händlerreittier und TradeSkillMaster sind optional.",
      "version": "Video vom 11. März 2017. Mengen und Preise stammen aus der damaligen Aufnahme, nicht aus einem aktuellen Patchtest.",
      "faq": [
        {
          "question": "Wie laufe ich die Stoffroute?",
          "answer": "Arbeite die vier Gruppen im Video gegen den Uhrzeigersinn ab, einschließlich der Gruppe hinter dem Hügel. Nutze Flächenschaden, plündere und bleib in Bewegung."
        },
        {
          "question": "Brauche ich einen Schurken oder ein Händlerreittier?",
          "answer": "Ich nutze im Video Dolchfächer mit einem Schurken, aber geeigneter Flächenschaden reicht aus. Das Händlerreittier ist optional und hilft beim Leeren der Taschen."
        },
        {
          "question": "Zähle ich seltenes Transmog zum Stoffgold pro Stunde?",
          "answer": "Zähle es getrennt. Der Verkauf kann Monate dauern. Prüfe aktuelle Stoffpreise und deine eigenen Beutemengen."
        }
      ],
      "sourceUpdatedAt": "2026-10-21",
      "translatedAt": "2026-10-23"
    }
  },
  "vi": {
    "firelands-volatile-farm": {
      "title": "Farm nguyên tố Volatile trong Firelands: tuyến không giết trùm",
      "description": "Farm quái thường trong Firelands với Potion of Treasure Finding để lấy Volatile Air, Volatile Life và Volatile Water. Giữ tất cả trùm còn sống.",
      "summary": "Dọn quái thường khi thuốc còn hiệu lực, giữ ba nguyên liệu Volatile và không giết bất kỳ trùm nào.",
      "location": "Firelands, Mount Hyjal",
      "targets": [
        "Volatile Air",
        "Volatile Life",
        "Volatile Water"
      ],
      "setup": "Potion of Treasure Finding, túi trống và nhân vật đủ mạnh để dọn các nhóm quái.",
      "version": "Video ngày 3 tháng 8 năm 2018. Hãy kiểm tra vật phẩm rơi, việc đặt lại phụ bản và giá trong phiên bản bạn chơi; đây không phải thử nghiệm hiện tại.",
      "faq": [
        {
          "question": "Tôi cần mang theo gì?",
          "answer": "Mang Potion of Treasure Finding, túi trống và nhân vật đủ mạnh để dọn quái thường. So sánh giá thuốc với giá ba nguyên liệu Volatile trước khi bắt đầu."
        },
        {
          "question": "Có nên giết trùm không?",
          "answer": "Không. Giữ tất cả trùm còn sống và tránh kéo quái hoặc dùng kỹ năng diện rộng gần chúng. Ra ngoài và đặt lại phụ bản khi trò chơi cho phép."
        },
        {
          "question": "Tính lợi nhuận thế nào?",
          "answer": "Tính nguyên liệu thực sự nhặt được và bán được rồi trừ giá thuốc. Mở các rương và tách giá trị hàng chưa bán khỏi số vàng đã nhận."
        }
      ],
      "sourceUpdatedAt": "2026-10-21",
      "translatedAt": "2026-10-23"
    },
    "burning-steppes-mageweave-runecloth-farm": {
      "title": "Farm Mageweave Cloth và Runecloth tại Burning Steppes",
      "description": "Theo tuyến bốn nhóm quái của King K tại Burning Steppes để farm Mageweave Cloth và Runecloth. Dùng sát thương diện rộng và nhặt đồ kịp thời.",
      "summary": "Di chuyển ngược chiều kim đồng hồ qua bốn nhóm quái. Nhặt đồ trước khi xác biến mất và tính đồ ngoại hình riêng với số vải.",
      "location": "Burning Steppes, Eastern Kingdoms",
      "targets": [
        "Mageweave Cloth",
        "Runecloth"
      ],
      "setup": "Kỹ năng sát thương diện rộng và túi trống. Thú cưỡi có người bán hàng và TradeSkillMaster là tùy chọn.",
      "version": "Video ngày 11 tháng 3 năm 2017. Số lượng và giá thuộc lần quay đó, không phải thử nghiệm trên bản cập nhật hiện tại.",
      "faq": [
        {
          "question": "Đi tuyến farm vải như thế nào?",
          "answer": "Đi ngược chiều kim đồng hồ qua bốn nhóm quái trong video, gồm cả nhóm sau ngọn đồi. Dùng sát thương diện rộng, nhặt đồ và tiếp tục di chuyển."
        },
        {
          "question": "Có cần Rogue hoặc thú cưỡi bán hàng không?",
          "answer": "Tôi dùng Fan of Knives trên Rogue trong video, nhưng chỉ cần sát thương diện rộng phù hợp. Thú cưỡi bán hàng là tùy chọn, giúp dọn túi tại chỗ."
        },
        {
          "question": "Có tính đồ ngoại hình hiếm vào vàng mỗi giờ từ vải không?",
          "answer": "Hãy tính riêng. Đồ ngoại hình có thể mất nhiều tháng mới bán được. Kiểm tra giá vải hiện tại và đếm vật phẩm của chính bạn."
        }
      ],
      "sourceUpdatedAt": "2026-10-21",
      "translatedAt": "2026-10-23"
    }
  }
};
