use std::{collections::HashMap, collections::HashSet, str::Lines, time::Instant};

use regex::Regex;

pub fn main() {
    let year = 2015;
    let day = 09;
    println!("Aoc Year {} Day: {:02}", year, day);
    let t: Instant;

    let input = std::fs::read_to_string(format!("../input/{}/{:02}.txt", year, day)).unwrap();
    dbg!(&input[..13]);
    let list = parse(&input);

    t = Instant::now();
    let res = solve_part1(list.clone());
    dbg!(t.elapsed().as_millis());
    dbg!(&res);
    /*
    t = Instant::now();
    let res2 = solve_part2(list.clone());
    dbg!(t.elapsed().as_micros());
    dbg!(&res2); */
}

#[derive(Debug, Clone)]
struct Edge {
    from: String,
    to: String,
    distance: u32,
}

#[derive(Debug, Clone)]
struct Nodes {
    name: String,
    froms: Vec<Edge>,
    tos: Vec<Edge>,
}

pub fn solve_part1(input: Lines) -> String {
    let mut nodes: HashMap<String, Nodes> = HashMap::new();
    let input_re = Regex::new(r"(\w+)\sto\s(\w+)\s=\s(\d+)").unwrap();

    for l in input {
        let c = input_re.captures(l).unwrap();
        let from = c.get(1).map_or("".to_string(), |x| x.as_str().to_string());
        let to = c.get(2).map_or("".to_string(), |x| x.as_str().to_string());
        let e = Edge {
            from: (&from).to_string(),
            to: (&to).to_string(),
            distance: c.get(3).map_or(0, |x| x.as_str().parse::<u32>().unwrap()),
        };

        // Get or  Create nodes if not already
        let from_v = nodes.entry(from.clone()).or_insert(Nodes {
            name: (&from).to_string(),
            froms: Vec::new(),
            tos: Vec::new(),
        });

        from_v.froms.push(e.clone());

        let to_v = nodes.entry(to.clone()).or_insert(Nodes {
            name: (&to).to_string(),
            froms: Vec::new(),
            tos: Vec::new(),
        });

        // Instert edge in the corresponding place
        to_v.tos.push(e);
    }
    let mut queOfEdges = Vec::<Edge>::new();
    let mut path = Vec::<Edge>::new();
    let mut shorterEdges = Vec::<Edge>::new();

    // Start at any node
    let firstNode = nodes.values().next().unwrap();

    let mut visitedNode = HashSet::new();
    visitedNode.insert(firstNode.name.clone());
    queOfEdges.append(&mut firstNode.froms);
    
    while visitedNode.len() != nodes.len() {

        // Pull the shortes edge.

        //Add node to visited

        // Add to queue all posibles edges
    }

    // From vec of edges. Fold to the sum

    "0".to_string()
}

pub fn parse(s: &String) -> Lines<'_> {
    s.lines()
}

/* #[test]
fn test_solve1() {
    assert_eq!(
        solve_part1(parse(
            &r###"""
"abc"
"aaa\"aaa"
"\x27""###
                .to_string()
        )),
        "12".to_string()
    );
}

#[test]
fn test_solve2() {
    assert_eq!(
        solve_part2(parse(
            &r###"""
"abc"
"aaa\"aaa"
"\x27""###
                .to_string()
        )),
        "19".to_string()
    );
} */
