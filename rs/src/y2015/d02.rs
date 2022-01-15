pub fn main() {
    println!("Aoc Year: 2015 Day: 02");

    let input = std::fs::read_to_string("../input/2015/02.txt").unwrap();
    let list = parse(&input);
    dbg!(&list[..2]);

    let res = solve_part1(&list);
    assert_eq!(solve_part1(&parse(&String::from("2x3x4"))), 58);
    assert_eq!(solve_part1(&parse(&String::from("1x1x10"))), 43);

    dbg!(res);
    //  assert_eq!(res, 232);

    let res2 = solve_part2(&list);
    assert_eq!(solve_part2(&parse(&String::from("2x3x4"))), 34);
    assert_eq!(solve_part2(&parse(&String::from("1x1x10"))), 14);
    dbg!(res2);
}

pub fn parse(s: &String) -> Vec<Vec<i32>> {
    s.lines()
        .map(|l| {
            l.split('x')
                .map(|n| n.parse::<i32>().unwrap_or(0))
                .collect::<Vec<_>>()
        })
        .collect::<Vec<Vec<_>>>()
}

fn get_areas_of_rectangle(rectangle: &Vec<i32>) -> Vec<i32> {
    let mut vec = Vec::new();
    //TODO: use `combinations`
    for (i, side) in rectangle.iter().enumerate() {
        for other_side in rectangle.iter().skip(i + 1) {
            vec.push(side * other_side);
        }
    }

    vec
}

pub fn solve_part1(parsed: &Vec<Vec<i32>>) -> i32 {
    let mut res: i32 = 0;
    // Get all sides
    for gift in parsed.iter() {
        let areas = get_areas_of_rectangle(gift);
        // dbg!(&areas);
        res += areas.iter().sum::<i32>() * 2;
        res += areas.iter().min().unwrap();
    }

    //
    res
}

pub fn solve_part2(parsed: &Vec<Vec<i32>>) -> i32 {
    let mut res: i32 = 0;
    // Get all sides
    for gift in parsed.iter() {
        let mut sorted = gift.clone();
        sorted.sort();
        res += sorted.iter().take(2).sum::<i32>() * 2;
        res += sorted.iter().fold(1, |acc, x| acc * x);
    }

    //
    res
}
